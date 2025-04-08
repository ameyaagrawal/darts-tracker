import React from 'react';
import Cricket from './Cricket';
import DTW from './DTW';

function TrackerPage({ selectedMode, numPlayers, handleBack }) {
  return (
    <div>
      {selectedMode === 'cricket' ? (
        <div>
          <h1>Cricket</h1>
          <Cricket numPlayers={numPlayers} />
        </div>
      ) : (
        <div>
          <h1>DTW</h1>
          <DTW numPlayers={numPlayers} />
        </div>
      )}
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default TrackerPage;
