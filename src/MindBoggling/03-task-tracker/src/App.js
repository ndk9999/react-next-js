import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Todo from "./components/Todo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("taskList");
    setTaskList(data ? JSON.parse(data) : []);
  }, []);

  const addToCompletedList = (task) => {
    setTaskList((prev) => {
      const idx = prev.indexOf(task);
      if (idx >= 0) {
        prev.splice(idx, 1);
      }
      return [...prev];
    });
    setCompletedTasks((prev) => {
      const idx = prev.indexOf(task);
      if (idx < 0) {
        return [...prev, task];
      }
      return [...prev];
    });
  };

  const [{isOver}, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompletedList(item.task),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold py-4">
        03 - The Task Tracker
      </h1>

      <div className="flex flex-row gap-2 items-center">
        <div>Click</div>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <div>to add a new task</div>
      </div>

      <div className="flex flex-row gap-4 mt-5">
        <div className="w-6/12">
          <h2 className="bg-slate-400 p-3 mb-3 text-xl font-semibold">
            To Do Tasks
          </h2>
          <div className="flex flex-col gap-4">
            {taskList.map((task, idx) => (
              <Todo key={task.projectName + "-" + idx} task={task} taskList={taskList} setTaskList={setTaskList} />
            ))}
          </div>
        </div>

        <div className="w-6/12" ref={drop}>
          <h2 className="bg-green-700 text-white p-3 mb-3 text-xl font-semibold">
            Completed Tasks
          </h2>
          <div className="flex flex-col gap-4">
            {completedTasks.map((task, idx) => (
              <Todo key={task.projectName + "-" + idx} task={task} taskList={completedTasks} setTaskList={setCompletedTasks} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
