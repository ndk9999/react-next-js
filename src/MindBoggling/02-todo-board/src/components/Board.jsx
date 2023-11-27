const Board = ({ task, setTaskList }) => {
  const handleDeleteTask = () => {
    setTaskList((currentTasks) => currentTasks.filter((item) => item !== task));
  };

  return (
    <div className="max-w-md flex flex-col items-center justify-between border text-center text-lg pt-3 pb-4 px-4 md:px-6">
      <p>{task}</p>

      <button
        className="bg-red-500 text-white rounded-lg py-1 px-2"
        onClick={handleDeleteTask}
      >
        Delete
      </button>
    </div>
  );
};

export default Board;
