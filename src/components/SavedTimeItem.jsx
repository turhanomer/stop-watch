const SavedTimeItem = ({ index, savedTime, onDelete }) => {
  const formatTime = (time) => {
    const minutes = ("0" + Math.floor(time / 60000)).slice(-2);
    const seconds = ("0" + Math.floor(time / 1000) % 60).slice(-2);
    const centiseconds = ("0" + Math.floor(time / 10) % 100).slice(-2);
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div className="saved-time-entry flex justify-between items-center mb-2">
      <div>
        <span className="font-semibold">Saved time {index + 1}:</span> {formatTime(savedTime)}
      </div>
      <button
        onClick={() => onDelete(index)}
        type="button"
        className="text-white btn btn-outline-danger px-3"
      >
        Delete
      </button>
    </div>
  );
};

export default SavedTimeItem;
