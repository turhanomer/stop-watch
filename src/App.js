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

  const handleDelete = (index) => {
    const newSavedTimes = savedTimes.filter((_, i) => i !== index);
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
        <div id="buttons" className="w-1/2 flex justify-between">
          {running ? (
            <button
              className="border rounded-lg py-2 px-9 flex items-center gap-2"
              onClick={handleStop} // handleStop'u doğrudan bağla
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-pause-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z" />
              </svg>
              Stop
            </button>
          ) : (
            <button
              className="border rounded-lg py-2 px-9 hover:bg-sky-950 flex items-center gap-2"
              onClick={() => {
                setRunning(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-skip-start-circle "
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M10.229 5.055a.5.5 0 0 0-.52.038L7 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407v-5a.5.5 0 0 0-.271-.445" />
              </svg>
              Start
            </button>
          )}
          <button
            className="border rounded-lg py-2 px-9 hover:bg-sky-950 flex items-center gap-2"
            onClick={() => {
              localStorage.removeItem("savedTimes");
              setSavedTimes([]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
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
                <div>
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
                <button
                  onClick={() => handleDelete(index)}
                  type="button"
                  className="text-white btn btn-outline-danger float-end items-center px-3 -my-11"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
