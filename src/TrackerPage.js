import React from 'react';
import Cricket from './Cricket';
import DTW from './DTW';

function TrackerPage({ selectedMode, selectedPlayers, handleBack }) {
  return (
    <div>
      {selectedMode === 'cricket' ? (
        <Cricket selectedPlayers={selectedPlayers} />
      ) : (
        <DTW selectedPlayers={selectedPlayers} />
      )}
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default TrackerPage;
