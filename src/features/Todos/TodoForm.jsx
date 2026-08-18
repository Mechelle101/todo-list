
import { useState } from 'react'
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';

function TodoForm({ onAddTodo }) {
    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();
        onAddTodo(workingTodoTitle);
        setWorkingTodoTitle('');
    };

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoId"
                labelText="Todo"
                value={workingTodoTitle}
                onChange={(e) => setWorkingTodoTitle(e.target.value)} 
            />

            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
        </form>
    );
}

export default TodoForm;
