
import { useRef } from 'react'

function TodoForm({ onAddTodo }) {
    const inputRef = useRef();

    const handleAddTodo = (e) => {
        e.preventDefault();

        // .trim prevents whitespace only todos
        const todoTitle = e.target.todoTitle.value.trim();
        if(todoTitle && todoTitle !== "") {
            onAddTodo(todoTitle);
            e.target.reset();
            inputRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
                ref={inputRef}
                type="text" 
                id="todoTitle"
                name="todoTitle"
                placeholder={'Todo text'}
                required 
            />
            <button type="submit" >Add Todo</button>
        </form>
    );
}

export default TodoForm;
