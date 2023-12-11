import React, { useEffect, useState } from "react";

const EditTask = ({ task, taskList, setTaskList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      setProjectName(value);
    }

    if (name === "taskDescription") {
      setTaskDescription(value);
    }
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();

    setTaskList((prev) => {
      const taskIdx = prev.indexOf(task);
      prev.splice(taskIdx, 1, {
        projectName: projectName,
        taskDescription: taskDescription,
        timestamp: task.timestamp,
        duration: task.duration
      });

      localStorage.setItem("taskList", JSON.stringify(prev));

      return [...prev];
    });

    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className="bg-gray-400 text-white py-1 px-2 rounded text-sm font-semibold uppercase hover:bg-blue-700 hover:text-yellow-200"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </button>

      {isModalOpen ? (
        <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-black bg-opacity-40">
          <div className="w-9/12 max-w-lg flex flex-col bg-white rounded-lg shadow-lg relative">
            <div className="flex flex-row justify-between items-center p-3 border-b border-b-slate-300 rounded-t">
              <h3>Update Task</h3>
              <button
                type="button"
                className="text-xl font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
            </div>
            <form className="p-3">
              <div className="flex flex-col mb-4">
                <label
                  className="tracking-wide uppercase text-xs text-gray-700 font-semibold mb-2"
                  htmlFor="project-name"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="project-name"
                  name="projectName"
                  placeholder="Project name"
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                  required
                  value={projectName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="tracking-wide uppercase text-xs text-gray-700 font-semibold mb-2"
                  htmlFor="task-description"
                >
                  Task Description
                </label>
                <textarea
                  type="text"
                  id="task-description"
                  name="taskDescription"
                  placeholder="Task description"
                  rows={4}
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                  value={taskDescription}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </form>
            <div className="p-3 border-t border-t-slate-300 flex justify-end rounded-b">
              <button
                type="button"
                className="bg-blue-500 text-white font-semibold uppercase text-sm px-3 py-2 rounded hover:opacity-70"
                onClick={handleUpdateTask}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditTask;
