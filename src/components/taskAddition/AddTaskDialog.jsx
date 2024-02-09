import { useEffect } from "react";

import TaskAddingForm from "./TaskAdditionForm";

const AddTaskDialogue = ({ addTask, closeAddTask }) => {
  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeAddTask();
    };

    window.addEventListener("keydown", closeModalIfEscaped);

    return () => {
      window.removeEventListener("keydown", closeModalIfEscaped);
    };
  }, [closeAddTask]);

  return (
    <div
      role="dialog"
      aria-labelledby="addTask"
      onClick={(e) => {
        e.target === e.currentTarget && closeAddTask();
      }}
    >
      <TaskAddingForm addTask={addTask} />
    </div>
  );
};
export default AddTaskDialogue;
