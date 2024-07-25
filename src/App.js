import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const storedTimes = JSON.parse(localStorage.getItem("savedTimes")) || [];
    setSavedTimes(storedTimes);
  }, []);

  const handleStop = () => {
    setRunning(false);
    const newSavedTimes = [...savedTimes, time];
    setSavedTimes(newSavedTimes);
    localStorage.setItem("savedTimes", JSON.stringify(newSavedTimes));
  };

  return (
    <>
      <div className=" dark:bg-slate-800 dark:text-white flex flex-col items-center justify-center py-8 mb-2">
        <div className="flex flex-row items-baseline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-stopwatch"
          viewBox="0 0 16 15"
        >
          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
          <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
        </svg>
        <h1 className="text-2xl font font-semibold pb-2 pl-4">STOPWATCH</h1>
        </div>
        <div className="text-3xl font-semibold py-4">
          <span>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + (Math.floor(time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="w-1/4 max-w-sm flex flex-row justify-between">
          {running ? (
            <button
              className="border rounded-lg py-1 px-3"
              onClick={handleStop} // handleStop'u doğrudan bağla
            >
              Stop
            </button>
          ) : (
            <button
              className="border rounded-lg py-1 px-3 hover:bg-sky-950"
              onClick={() => {
                setRunning(true);
              }}
            >
              Start
            </button>
          )}
          <button
            className="border rounded-lg py-1 px-3 hover:bg-sky-950"
            onClick={() => {
              setTime(0);
              localStorage.removeItem("savedTimes");
              setSavedTimes([]);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      {savedTimes.length > 0 && (
        <div className="saved-times-container mt-28 mb-3e">
          <div className="card-body rounded">
            {savedTimes.map((savedTime, index) => (
              <div key={index} className="saved-time-entry">
                Saved time: {index + 1} <br />
                <span>
                  {("0" + (Math.floor(savedTime / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + (Math.floor(savedTime / 1000) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + (Math.floor(savedTime / 10) % 100)).slice(-2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
