import SavedTimeItem from './SavedTimeItem';

const SavedTimesList = ({ savedTimes, onDelete }) => {
  return (
    <div className="saved-times-container mt-28 mb-3e">
      <div className="card-body rounded">
        {savedTimes.map((savedTime, index) => (
          <SavedTimeItem
            key={index}
            index={index}
            savedTime={savedTime}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedTimesList;
