import { useState } from "react";
import AddTaskDialogue from "./components/taskAddition/AddTaskDialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("todo-tasks", []);
  const [addingTask, setAddingTask] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };
  const closeAddTask = () => {
    setAddingTask(false);
    previousFocusEl.focus();
  };
  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>
      {addingTask ? (
        <AddTaskDialogue addTask={addTask} closeAddTask={closeAddTask} />
      ) : null}

      <div className="addTask">
        <button
          className="btn"
          onClick={() => {
            setAddingTask(true);
            setPreviousFocusEl(document.activeElement);
          }}
        >
          Add Task
          <PlusIcon width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
