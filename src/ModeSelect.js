import React from 'react';

function ModeSelect({ selectedMode, handleModeChange }) {
  return (
    <div>
      <h2>Select a Game Mode</h2>
      <div>
        <input
          type="radio"
          id="cricket"
          name="gameMode"
          value="cricket"
          onChange={handleModeChange}
          checked={selectedMode === "cricket"}
        />
        <label htmlFor="cricket">Cricket</label>
      </div>
      <div>
        <input
          type="radio"
          id="dtw"
          name="gameMode"
          value="dtw"
          onChange={handleModeChange}
          checked={selectedMode === "dtw"}
        />
        <label htmlFor="dtw">DTW</label>
      </div>
    </div>
  );
}

export default ModeSelect;
