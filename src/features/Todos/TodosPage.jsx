
import { useState, useEffect, useCallback } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList.jsx';
import SortBy from '../../shared/SortBy';
import useDebounce from '../../utils/useDebounce';
import FilterInput from '../../shared/FilterInput.jsx';

export default function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterTerm, setFilterTerm] = useState('');
    const debouncedFilterTerm = useDebounce(filterTerm, 300);
    const [dataVersion, setDataVersion] = useState(0);
    const [filterError, setFilterError] = useState('');

    useEffect(() => {
        if(!token) {
            return;
        }

    const fetchTodos = async () => {
        setIsTodoListLoading(true);
        setError('');

        try {
            const paramsObject = {
                sortBy,
                sortDirection,
                limit: 100,
            };
            if(debouncedFilterTerm) {
                paramsObject.find = debouncedFilterTerm;
            }
            const params = new URLSearchParams(paramsObject);

            const resp = await fetch(`/api/tasks?${params}`, {
                headers: { 'X-CSRF-TOKEN': token },
                credentials: 'include',
            });

            if(!resp.ok) {
                if(resp.status === 401) {
                    throw new Error('unauthorized');
                }
                throw new Error('Failed to fetch todos');
            }

            const data = await resp.json();
            setTodoList(Array.isArray(data.tasks) ? data.tasks : []);
            setFilterError('');

        } catch (error) {
            if(debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
                setFilterError(`Error fetching/sorting ${error.message}`);
            } else {
                setError(`Error fetching todos: ${error.message}`);
            }
        } finally {
            setIsTodoListLoading(false);
        }
    };  
        fetchTodos(); 
    }, [token, sortBy, sortDirection, debouncedFilterTerm]);

    const handleFilterChange = (newTerm) => {
        setFilterTerm(newTerm);
    };

    const invalidateCache = useCallback(() => {
        console.log('Invalidating memo cache after todo mutation');
        setDataVersion((prev) => prev + 1);
    }, []);

        const updateTodo = async (editedTodo) => {
            setError('');
            const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

        setTodoList((prev) => 
            prev.map((todo) => (todo.id === editedTodo.id ? { ...editedTodo } : todo))
        );

        try {
            const resp = await fetch(`/api/tasks/${editedTodo.id}`, {
             method: 'PATCH',
             headers: {
                'Content-Type': 'application/json',
                 'X-CSRF-TOKEN': token,
             },
             credentials: 'include',
             body: JSON.stringify({ 
                title: editedTodo.title,
                isCompleted: editedTodo.isCompleted 
                }),   
            });

            if (!resp.ok) {
                throw new Error('Failed to update todo');
            }
            invalidateCache();
        } catch (error) {
            setTodoList((prev) =>
                prev.map((todo) => (todo.id === editedTodo.id ? originalTodo : todo))
            );
            setError(`Failed to update todo: ${error.message}`);
        }
    }; //updateTodo

    const addTodo = async (todoTitle) => {
        setError('');

        const newTodo = {
            id: Date.now(),
            title: todoTitle,
            isCompleted: false,
        };

        // this is the optimistic part, showing it immedaitely
        setTodoList((prev) => [newTodo, ...prev]);
        
        try {
            const resp = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: todoTitle,
                    isCompleted: false,
                }),
            });

            if(!resp.ok) {
                throw new Error('Failed to save todo');
            }

            const savedTodo = await resp.json();
            setTodoList((prev) =>
                prev.map((todo) => (todo.id === newTodo.id ? savedTodo : todo))
            );
            invalidateCache();
        } catch (error) {
            setTodoList((prev) => prev.filter((todo) => todo.id !== newTodo.id));
            setError(`Failed to add todo: ${error.message}`);
        }
    };

    async function completeTodo(id) {
        setError('');
        
        const originalTodo = todoList.find((todo) => todo.id === id);

        setTodoList((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: true } : todo
            )
        );

        try {
            const resp = await fetch(`/api/tasks/${id}`, {
             method: 'PATCH',
             headers: {
                'Content-Type': 'application/json',
                 'X-CSRF-TOKEN': token,
             },
             credentials: 'include',
             body: JSON.stringify({ isCompleted: true }),   
            });
            if (!resp.ok) {
                throw new Error('Failed to complete todo');
            }
            invalidateCache();
        } catch (error) {
            setTodoList((prev) =>
                prev.map((todo) => (todo.id === id ? originalTodo : todo))
            );
            setError(`Failed to complete todo: ${error.message}`);
        }
    } //completeTodo

    return (
        <>
            {isTodoListLoading && <p>Loading todos...</p>}

            {error && (
                <div>
                    <p>{error}</p>
                    <button type='button' onClick={() => setError('')}>
                        Clear Error
                    </button>
                </div>
            )}

            {filterError && (
            <div>
                <p>{filterError}</p>
                <button type='button' onClick={() => setFilterError('')}>
                    Clear Filter Error
                </button>
                <button
                    type='button'
                    onClick={() => {
                        setFilterTerm('');
                        setSortBy('createdAt');
                        setSortDirection('desc');
                        setFilterError('');
                    }}
                >
                    Reset Filters
                </button>
            </div>
            )}           

            <SortBy 
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortByChange={setSortBy}
                onSortDirectionChange={setSortDirection}
            />

            <FilterInput 
                filterTerm={filterTerm}
                onFilterChange={handleFilterChange}
            />

            <TodoForm onAddTodo={addTodo} />

            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                dataVersion={dataVersion}
            />
        </>
    );
}
