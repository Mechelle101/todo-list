
import { useState, useEffect } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList.jsx';

export default function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);

    useEffect(() => {
        if(!token) {
            return;
        }

    const fetchTodos = async () =>{
        setIsTodoListLoading(true);
        setError('');

        try {
            const params = new URLSearchParams({ limit: 100 });
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
        } catch (error) {
            setError(error.message);
        } finally {
            setIsTodoListLoading(false);
        }
    };
        fetchTodos(); 
    }, [token]);

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

            // now swap the temp todo for the real one from the server
            const savedTodo = await resp.json();
            setTodoList((prev) =>
                prev.map((todo) => (todo.id === newTodo.id ? savedTodo : todo))
            );
        } catch (error) {
            // now remove the todo that never saved
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

            <TodoForm onAddTodo={addTodo} />
            <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
            />
        </>
    );
}
