import React from 'react';

function PlayerSelect({ numPlayers, handlePlayersChange }) {
  return (
    <div>
      <h2>Select Number of Players</h2>
      <div>
        <input
          type="radio"
          id="players2"
          name="numberOfPlayers"
          value="2"
          onChange={handlePlayersChange}
          checked={numPlayers === 2}
        />
        <label htmlFor="players2">2 Players</label>
      </div>
      <div>
        <input
          type="radio"
          id="players3"
          name="numberOfPlayers"
          value="3"
          onChange={handlePlayersChange}
          checked={numPlayers === 3}
        />
        <label htmlFor="players3">3 Players</label>
      </div>
      <div>
        <input
          type="radio"
          id="players4"
          name="numberOfPlayers"
          value="4"
          onChange={handlePlayersChange}
          checked={numPlayers === 4}
        />
        <label htmlFor="players4">4 Players</label>
      </div>
    </div>
  );
}

export default PlayerSelect;
