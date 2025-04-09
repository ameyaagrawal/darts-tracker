import React, { useState } from 'react';
import { handleNameChange, handleTargetClick, handleUndoButton, resetState } from './gameLogic';

function Cricket({ numPlayers }) {
  const [playerNames, setPlayerNames] = useState(
    Array.from({ length: numPlayers }, (_, i) => `P${i + 1}`)
  );

  const targets = ['Score', 20, 19, 18, 17, 16, 15, 'B'];
  const [scores, setScores] = useState(Array(numPlayers).fill(0));
  const [counts, setCounts] = useState(
    Array.from({ length: targets.length - 1 }, () => Array(numPlayers).fill(0))
  );
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [showWinner, setShowWinner] = useState(false);

  return (
    <div>
      {showWinner && (
        <div className="popup-window">
          <h2>Game Over!</h2>
          <p>Winner: {winner}</p>
          <button onClick={() => setShowWinner(false)}>Close</button>
        </div>
      )}
      <div className="tracker-container">
        <table className="tracker-table" border="1">
          <tbody>
            {Array.from({ length: targets.length + 1 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: numPlayers + 1 }).map((_, colIndex) => {
                  if (rowIndex === 0 && colIndex === 0) {
                    return <td key={colIndex} className="cricket-cell"></td>;
                  } else if (rowIndex === 0 && colIndex >= 1) {
                    return (
                      <td key={colIndex} className="cricket-cell">
                        <input
                          type="text"
                          value={playerNames[colIndex - 1] || ''}
                          onChange={(e) => handleNameChange(colIndex - 1, e.target.value, playerNames, setPlayerNames)}
                          disabled={gameOver}
                          className="name-input"
                        />
                      </td>
                    );
                  } else if (rowIndex > 0 && colIndex === 0) {
                    return (
                      <td key={colIndex} className="cricket-cell">
                        {targets[rowIndex - 1]}
                      </td>
                    );
                  } else if (rowIndex === 1 && colIndex > 0) {
                    return (
                      <td key={colIndex} className="cricket-cell">
                        {scores[colIndex - 1]}
                      </td>
                    );
                  }
                  return (
                    <td key={colIndex} className="cricket-cell">
                      <button
                        onClick={() => handleTargetClick(rowIndex - 2, colIndex - 1, counts, scores, targets, history, playerNames, numPlayers, 0, setCounts, setScores, setHistory, setGameOver, setShowWinner, setWinner)}
                        disabled={gameOver}
                        className={`tracker-button ${counts[rowIndex - 2][colIndex - 1] >= 3 ? 'green' : ''}`}
                      >{counts[rowIndex - 2][colIndex - 1]}</button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='undo-clear-container'>
          <button onClick={() => handleUndoButton(history, gameOver, setHistory, setCounts, setScores, setGameOver)} disabled={history.length === 0}>Undo</button>
          <button onClick={() => resetState(numPlayers, targets, setScores, setCounts, setHistory, setGameOver, setWinner, setShowWinner)}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default Cricket;
