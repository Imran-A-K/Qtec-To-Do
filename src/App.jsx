import { useState } from "react";
import AddTaskDialogue from "./components/taskAddition/AddTaskDialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskList from "./components/taskDisplay/taskList/Tasklist";
import EditForm from "./components/taskEdit/EditForm";
import ThemeSwitcher from "./components/theme/ThemeSwitcher";
import { taskPriorities } from "./constants/priorityConstants";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useLocalStorage("todo-tasks", []);
  const [addingTask, setAddingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [filter, setFilter] = useState("showAll");
  const sorter = (arr) => {
    let initialArray = [...arr];

    initialArray.sort((a, b) => {
      if (a.priority === "High") {
        return -1;
      } else if (a.priority === "Medium" && b.priority === "High") {
        return 1;
      } else if (a.priority === "Medium" && b.priority === "Low") {
        return -1;
      } else if (a.priority === "Medium" && b.priority === "Medium") {
        return -1;
      } else {
        return 0;
      }
    });

    let result = [...initialArray];

    return result;
  };

  const sortedTasks = sorter(tasks);
  const filteredTasks =
    filter === "showAll"
      ? sortedTasks
      : sortedTasks.filter(
          (task) => task.priority.toLowerCase() === filter.toLowerCase()
        );

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
    toast.success("Task updated successfully");
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
      <Toaster />
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
          <option value="showAll">Show all</option>
          {taskPriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      {filteredTasks ? (
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      ) : null}
      <ThemeSwitcher />
    </div>
  );
}

export default App;
