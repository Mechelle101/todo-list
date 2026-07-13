function TodoList() {
    const todoList = [
        {id: 1, title: "review resources"},
        {id: 2, title: "take notes"},
        {id: 3, title: "code out app"},
    ]
    return (
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    );
}

export default TodoList;
