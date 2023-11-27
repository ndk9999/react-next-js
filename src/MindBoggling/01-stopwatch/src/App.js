import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!interval) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="max-w-md flex flex-col items-center justify-center m-auto">
      <h1 className="text-2xl font-semibold pb-2">01-Stopwatch</h1>

      <div className="text-xl font-semibold py-4">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div className="flex flex-row justify-between gap-5">
        {running ? (
          <button 
            className="border rounded-lg py-1 px-2 hover:bg-red-400 hover:border-red-800"
            onClick={() => setRunning(false)}
          >
            Stop
          </button>
        ) : (
          <button 
            className="border rounded-lg py-1 px-2 hover:bg-green-400 hover:border-green-800"
            onClick={() => setRunning(true)}
            >
              Start
            </button>
        )}
        <button 
          className="border rounded-lg py-1 px-2 hover:bg-blue-400 hover:border-blue-800"
          onClick={() => setTime(0)}
        >
            Reset
        </button>
      </div>
    </div>
  );
}

export default App;
