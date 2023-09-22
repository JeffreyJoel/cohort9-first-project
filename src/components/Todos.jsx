import { useTodo } from "../context/TodoContext";
import Button from "./Button";
import React from "react";

function Todos(props) {
  const {
    todos,
    editId,
    handleCheck,
    handleDelete,
    handleEdit,
    setEditId,
  } = useTodo();
  return (
    <div className="todo-wrapper">
      <ul>
        {!!todos.length &&
          todos.map((todo) => (
            <li className="todo" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheck(todo.id)}
              />
              {editId === todo.id ? (
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => {
                    handleEdit(e.target.value);
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
                    // console.log(todo);
                  }}
                  content={"✏️"}
                  disabled={todo.completed}
                />
              )}
              <Button onClick={() => handleDelete(todo.id)} content={"🗑️"} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Todos;
