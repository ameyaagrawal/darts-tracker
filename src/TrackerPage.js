import React from 'react';
import Cricket from './Cricket';
import DTW from './DTW';

function TrackerPage({ selectedMode, numPlayers, handleBack }) {
  return (
    <div>
      {selectedMode === 'cricket' ? (
        <Cricket numPlayers={numPlayers} />
      ) : (
        <DTW numPlayers={numPlayers} />
      )}
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default TrackerPage;
