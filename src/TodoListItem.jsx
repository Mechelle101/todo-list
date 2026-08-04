function TodoListItem({ todo, onCompleteTodo }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onClick={() => onCompleteTodo(todo.id)}
            />
            {todo.title}
        </li>
    );
}

export default TodoListItem;
