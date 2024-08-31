// src/App.js
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TimerDisplay from "./components/TimerDisplay";
import ControlButtons from "./components/ContolButtons";
import SavedTimesList from "./components/SavedTimeList";

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

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    const newSavedTimes = [...savedTimes, time];
    setSavedTimes(newSavedTimes);
    localStorage.setItem("savedTimes", JSON.stringify(newSavedTimes));
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    localStorage.removeItem("savedTimes");
    setSavedTimes([]);
  };

  const handleDelete = (index) => {
    const newSavedTimes = savedTimes.filter((_, i) => i !== index);
    setSavedTimes(newSavedTimes);
    localStorage.setItem("savedTimes", JSON.stringify(newSavedTimes));
  };

  return (
    <>
      <div className="dark:bg-slate-800 dark:text-white flex flex-col items-center justify-center p-5 mb-3">
        <Header />
        <TimerDisplay time={time} />
        <ControlButtons
          running={running}
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
        />
      </div>
      {savedTimes.length > 0 && (
        <SavedTimesList savedTimes={savedTimes} onDelete={handleDelete} />
      )}
    </>
  );
}

export default App;
