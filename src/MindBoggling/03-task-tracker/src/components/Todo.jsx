import { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const Todo = ({ task, taskList, setTaskList }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [{ isDragging, opacity }, drag] = useDrag(() => ({
    type: "todo",
    item: {task},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  useEffect(() => {
    setTime(task.duration || 0);
  }, []);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (!interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleStopTimer = () => {
    setRunning(false);

    const taskIdx = taskList.indexOf(task);
    taskList.splice(taskIdx, 1, {
      ...task,
      duration: time,
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
  };

  const handleDeleteTask = () => {
    setTaskList((prev) => {
      const idx = prev.indexOf(task);
      if (idx >= 0) {
        prev.splice(idx, 1);
      }

      localStorage.setItem("taskList", JSON.stringify(prev));

      return [...prev];
    });
  };

  return (
    <div
      className="flex flex-col items-start justify-start border border-slate-300 p-3 w-full rounded"
      ref={drag}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <h3 className="font-semibold text-xl">{task.projectName}</h3>
        <EditTask task={task} taskList={taskList} setTaskList={setTaskList} />
      </div>

      <p className="text-lg py-2 mt-3">{task.taskDescription}</p>

      <div className="w-full flex flex-row justify-between items-center my-2">
        <div className="font-semibold text-xl">
          <span>{("0" + Math.floor((time / 360000) % 24)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          <span className="text-sm text-pink-500">
            .{("0" + Math.floor((time / 10) % 100)).slice(-2)}
          </span>
        </div>
        <div className="text-sm">
          {running ? (
            <button
              type="button"
              className="border rounded py-1 px-2 text-white bg-red-500 hover:bg-red-700"
              onClick={handleStopTimer}
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              className="border rounded py-1 px-2 text-white bg-green-500 hover:bg-green-700"
              onClick={() => setRunning(true)}
            >
              Start
            </button>
          )}
          <button
            type="button"
            className="border rounded py-1 px-2 text-white bg-purple-500 hover:bg-purple-700"
            onClick={() => setTime(0)}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          type="button"
          className="bg-red-500 text-white py-1 px-2 rounded text-sm uppercase font-semibold"
          onClick={handleDeleteTask}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
