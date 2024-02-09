import { useState } from "react";
import AddTaskDialogue from "./components/taskAddition/AddTaskDialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskList from "./components/taskDisplay/taskList/Tasklist";
import EditForm from "./components/taskEdit/EditForm";
import ThemeSwitcher from "./components/theme/ThemeSwitcher";
import { taskPriorities } from "./constants/priorityConstants";

function App() {
  const [tasks, setTasks] = useLocalStorage("todo-tasks", []);
  const [addingTask, setAddingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [filter, setFilter] = useState("Show all");
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
      {isEditing ? (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
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
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="select"
          required
        >
          <option value="" disabled hidden>
            Show all
          </option>
          {taskPriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
      <ThemeSwitcher />
    </div>
  );
}

export default App;
