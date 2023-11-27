import { useState } from 'react';
import InputForm from './components/InputForm';
import Board from './components/Board';

function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <div className="px-12">
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <h1 className="text-xl font-semibold">
          02 - To Do Board
        </h1>

        <InputForm taskList={taskList} setTaskList={setTaskList} />
      </div>

      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 px-4 sm:px-8 md:px-10 lg:px-12">
        {taskList.map((item) => (
          <Board key={item} task={item} setTaskList={setTaskList} />
        ))}
      </div>


    </div>
  );
}

export default App;
