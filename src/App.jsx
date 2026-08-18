import { useState } from 'react'
import TodoList from './features/TodoList/TodoList.jsx'
import TodoForm from './features/TodoForm.jsx'
import './App.css'


function App() {
  const [todoList, setTodoList] = useState([]);

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) => 
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  };

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
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
    </div>

  )
}

export default App
