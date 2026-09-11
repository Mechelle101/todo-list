import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import {
  isValidTodoTitle,
  getTodoTitleError,
  MAX_TODO_LENGTH,
} from "../../utils/todoValidation";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const errorMessage =
    workingTodoTitle.length > 0 ? getTodoTitleError(workingTodoTitle) : "";

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!isValidTodoTitle(workingTodoTitle)) return;
    onAddTodo(workingTodoTitle.trim());
    setWorkingTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo} className="card row">
      <TextInputWithLabel
        elementId="todoId"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        maxLength={MAX_TODO_LENGTH}
      />

      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
      {errorMessage && <p className="field-error">{errorMessage}</p>}
    </form>
  );
}

export default TodoForm;
