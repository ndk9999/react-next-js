import { useState } from "react";

const InputForm = ({taskList, setTaskList}) => {
  const [taskName, setTaskName] = useState("");

  const handleNewTask = (e) => {
    e.preventDefault();
    setTaskList([...taskList, taskName]);
    setTaskName('');
  };

  return (
    <form className="flex flex-row items-center gap-3">
      <input
        className="border rounded py-1.5 px-2"
        type="text"
        placeholder="Add a task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <button 
        className="bg-violet-400 text-white py-1.5 px-3 rounded"
        onClick={handleNewTask}
      >
        Add Task
      </button>
    </form>
  );
};

export default InputForm;
