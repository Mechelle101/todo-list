import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { useState } from "react";
import { isValidTodoTitle } from "../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTodoTitle] = useState(todo.title);

    const handleCancel = () => {
        setWorkingTodoTitle(todo.title);
        setIsEditing(false);
    };

    const handleEdit = (e) => {
        setWorkingTodoTitle(e.target.value);
    };

    const handleUpdate = (e) => {
       if (!isEditing) return;
        e.preventDefault();
        if (!isValidTodoTitle(workingTitle)) return;
        onUpdateTodo({ ...todo, title: workingTitle });
        setIsEditing(false);
    };

    return (
        <li>
            <form onSubmit={handleUpdate}>
                {isEditing ? (
                    <>
                        <TextInputWithLabel 
                            elementId={`edit${todo.id}`}
                            labelText="Edit todo"
                            value={workingTitle}
                            onChange={handleEdit}
                        />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="button" onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle)}>Update</button>
                   </> 
                ) : (
                    <>
                        <label>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;
