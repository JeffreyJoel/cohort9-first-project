import "./App.css";
import Button from "./components/Button";
import Todos from "./components/Todos";
import { useTodo } from "./context/TodoContext";

function App() {
  
  const { handleAdd, trackTodoInput, todoText } = useTodo();

  return (

    <div className="App">
      <div className="addTodo">
        <input
          type="text"
          placeholder="enter a to-do"
          value={todoText}
          onChange={(e) => {
            trackTodoInput(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            handleAdd(todoText);
          }}
          content={"✅"}
        />
      </div>
      <Todos />
    </div>
  );
}

export default App;
