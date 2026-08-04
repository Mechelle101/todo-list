import { useState } from 'react'
import TodoList from './TodoList.jsx'
import TodoForm from './TodoForm.jsx'
import './App.css'


function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };
    setTodoList(prev => [newTodo, ...prev]);
  }

  function completeTodo(id) {
    const updateTodos = todoList.map((todo) => {
      if (todo.id === id ) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updateTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo}/>
    </div>

  )
}

export default App
