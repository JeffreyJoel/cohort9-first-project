import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Todos from "./components/Todos";
import { useTodo } from "./context/TodoContext";
import CompleteTodos from "./components/CompleteTodos";
import InCompleteTodos from "./components/IncompleteTodos";

function App() {

  const { handleAdd, trackTodoInput, todoText } = useTodo();
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index) => {
    setToggleState(index)
  }

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

      <div className="tab-container">
        <span className={toggleState === 0 ? "active-tab" : ""} onClick={() => toggleTab(0)}>All</span>
        <span className={toggleState === 1 ? "active-tab" : ""} onClick={() => toggleTab(1)}>Uncompleted</span>
        <span className={toggleState === 2 ? "active-tab" : ""} onClick={() => toggleTab(2)}>Completed</span>
      </div>
      <div>
        {toggleState === 0 ?
          <div >
            <Todos />
          </div>
          : ""
        }
        {toggleState === 1 ?
          <div>
            <InCompleteTodos />
          </div>
          : ""
        }
        {toggleState === 2 ?
          <div>
            <CompleteTodos />
          </div>
          : ""
        }
      </div>
    </div>
  );
}

export default App;
