import { useTodo } from "../context/TodoContext";
import Button from "./Button";
import React from "react";

function Todos(props) {
  const { todos, editId, handleCheck, handleDelete, handleEdit, setEditId } =
    useTodo();

  return (
    <div className="todo-wrapper">
      {todos.length > 0 ? (
        <ul>
          {!!todos.length &&
            todos.map((todo) => (
              <li className="todo" key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheck(todo.id)}
                  disabled={editId === todo.id}
                />
                {editId === todo.id ? (
                  <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => {
                      handleEdit(e.target.value);
                      // checkboxRef.current.disabled = true;
                    }}
                  />
                ) : (
                  <span className={`todo-title ${todo.completed && "checked"}`}>
                    {todo.title}
                  </span>
                )}
                {editId === todo.id ? (
                  <Button onClick={() => setEditId(null)} content={"✅"} />
                ) : (
                  <Button
                    onClick={() => {
                      setEditId(todo.id);
                    }}
                    content={"✏️"}
                    disabled={todo.completed}
                  />
                )}
                <Button onClick={() => handleDelete(todo.id)} content={"🗑️"} />
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-center">You have no todos</p>
      )}
    </div>
  );
}

export default Todos;
