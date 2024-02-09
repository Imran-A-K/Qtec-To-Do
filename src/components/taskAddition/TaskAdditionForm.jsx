import { useState } from "react";
import { taskPriorities } from "../../constants/priorityConstants";

const TaskAddingForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      name: task,
      checked: false,
      id: Date.now(),
      priority: priority,
    });
    setTask("");
    setPriority("");
  };
  const handlePriorityChange = (event) => {
    const selectedPriority = event.target.value;
    setPriority(selectedPriority);
  };
  return (
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input
          type="text"
          id="task"
          className="input"
          value={task}
          onInput={(e) => setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter Task"
        />
        <label htmlFor="task" className="label">
          Enter Task
        </label>
      </div>
      <div className="wrapper">
        <select
          value={priority}
          onChange={handlePriorityChange}
          className="select"
          required
        >
          <option value="" disabled hidden>
            Select Priority
          </option>
          {taskPriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <button className="btn" aria-label="Add Task" type="submit">
        Save
      </button>
    </form>
  );
};
export default TaskAddingForm;
