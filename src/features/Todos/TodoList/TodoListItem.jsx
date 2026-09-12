import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { useState } from "react";
import {
  isValidTodoTitle,
  MAX_TODO_LENGTH,
} from "../../../utils/todoValidation";

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
    onUpdateTodo({ ...todo, title: workingTitle.trim() });
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`edit${todo.id}`}
              labelText="Edit todo"
              value={workingTitle}
              onChange={handleEdit}
              maxLength={MAX_TODO_LENGTH}
            />
            <button
              type="button"
              onClick={handleCancel}
              className="button-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={!isValidTodoTitle(workingTitle)}>
              Update
            </button>
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
              <span className="visually-hidden">
                Mark &quot;{todo.title}&quot; complete
              </span>
            </label>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={
                todo.isCompleted ? "todo-title completed" : "todo-title"
              }
            >
              {todo.title}
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
