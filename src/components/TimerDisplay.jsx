const TimerDisplay = ({ time }) => {
  const formatTime = (time) => {
    const minutes = ("0" + Math.floor(time / 60000)).slice(-2);
    const seconds = ("0" + Math.floor(time / 1000) % 60).slice(-2);
    const centiseconds = ("0" + Math.floor(time / 10) % 100).slice(-2);
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div className="text-3xl font-semibold py-4">
      {formatTime(time)}
    </div>
  );
};

export default TimerDisplay;
