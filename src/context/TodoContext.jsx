import React, { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [todoText, setTodoText] =useState("")

  useEffect(() => {
    let canceled = false;

    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!canceled && response.ok) {
          const data = await response.json();
          console.log(data);
          setTodos(data.slice(0, 10));
          console.log(todos);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();

    return () => {
      canceled = true;
    };
  }, []);

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (newValue) => {
    const newTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newValue } : todo
    );
    setTodos(newTodos);
  };
  const handleAdd = (newValue) => {
    const newTodo = {
        completed: false,
        id: todos.length +1,
        title: newValue,
        userId: 1
    }
    setTodos([...todos, newTodo]);
    setTodoText('')
    
  };
  const trackTodoInput = (newValue)=>{
    setTodoText(newValue)
  }

  const value = {
    todos,
    editId,
    handleCheck,
    handleDelete,
    handleEdit,
    setEditId,
    handleAdd,
    trackTodoInput,
    todoText,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoProvider;
