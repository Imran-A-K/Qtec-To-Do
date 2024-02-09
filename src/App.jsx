import { useState } from "react";
import AddTaskDialogue from "./components/taskAddition/AddTaskDialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskList from "./components/taskDisplay/taskList/Tasklist";

function App() {
  const [tasks, setTasks] = useLocalStorage("todo-tasks", []);
  const [addingTask, setAddingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) =>
        t.id === task.id
          ? { ...t, name: task.name, priority: task.priority }
          : t
      )
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };
  const closeAddTask = () => {
    setAddingTask(false);
    previousFocusEl.focus();
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
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
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  );
}

export default App;
