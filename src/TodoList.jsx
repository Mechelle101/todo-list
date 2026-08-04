import TodoListItem from './TodoListItem.jsx'

function TodoList({todoList, onCompleteTodo}) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

// this will produce either a message or the list
    return (
      filteredTodoList.length === 0 ? (
        <p> Add todo above to get started</p>
      ) : (
      <ul>
        {filteredTodoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} />
        ))}
      </ul> 
      )
    );
}

export default TodoList;
