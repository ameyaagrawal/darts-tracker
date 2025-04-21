import React from 'react';
import { handleNameChange, handleTargetClick, handleUndoButton, resetState, images, colors } from './gameLogic';

function Cricket({ numPlayers, targets, playerNames, setPlayerNames, counts, setCounts, scores, setScores, history, setHistory, gameOver, setGameOver, winner, setWinner, showWinner, setShowWinner }) {
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
                    return <td key={colIndex}></td>;
                  } else if (rowIndex === 0 && colIndex > 0) {
                    return (
                      <td key={colIndex} className="cricket-names">
                        <input
                          type="text"
                          value={playerNames[colIndex - 1] || ''}
                          onFocus={(e) => {
                            e.target.dataset.previousValue = e.target.value; // Store the previous value
                            e.target.value = ''; // Clear the input when clicked
                          }}
                          onBlur={(e) => {
                            if (e.target.value.trim() === '') {
                              e.target.value = e.target.dataset.previousValue; // Revert to the previous value if no changes were made
                            }
                          }}
                          onChange={(e) => handleNameChange(colIndex - 1, e.target.value, playerNames, setPlayerNames)}
                          disabled={gameOver}
                          style={{ backgroundColor: colors[colIndex - 1] }}
                          className="cricket-name-input"
                        />
                      </td>
                    );
                  } else if (rowIndex === 1 && colIndex === 0) {
                    return (
                      <td key={colIndex} className="cricket-scoress">
                        Scores
                      </td>
                    );
                  } else if (rowIndex === 1) {
                    return (
                      <td
                        key={colIndex}
                        className="cricket-scores"
                        style={{
                          textDecoration: scores[colIndex - 1] === Math.min(...scores) ? 'underline' : 'none',
                          fontWeight: scores[colIndex - 1] === Math.min(...scores) ? 'bold' : 'normal',
                        }}
                      >
                        {scores[colIndex - 1]}
                      </td>
                    );
                  } else if (rowIndex > 1 && colIndex === 0) {
                    return (
                      <td key={colIndex} className="cricket-targets">
                        {targets[rowIndex - 1]}
                      </td>
                    );
                  }
                  return (
                    <td key={colIndex} className="cricket-cell">
                      <button
                        onClick={() => {handleTargetClick(rowIndex - 2, colIndex - 1, counts, scores, targets, history, playerNames, numPlayers, 0, setCounts, setScores, setHistory, setGameOver, setShowWinner, setWinner); console.log(history);}}
                        disabled={gameOver}
                        className={`tracker-button ${counts[rowIndex - 2][colIndex - 1] >= 3 ? 'green' : ''}`}
                      >
                        <img
                          src={images[Math.min(3, counts[rowIndex - 2][colIndex - 1])]}
                          alt="icon"
                          className="tracker-cell-image"
                        />
                        {counts[rowIndex - 2][colIndex - 1] > 3 && (
                          <span className="tracker-cell-score">
                            {`+${counts[rowIndex - 2][colIndex - 1] - 3}`}
                          </span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='undo-clear-container'>
          <button onClick={() => handleUndoButton(history, gameOver, setHistory, setCounts, setScores, setGameOver)} disabled={history.length === 0}>Undo</button>
          <button onClick={() => resetState(numPlayers, targets, history, counts, scores, setScores, setCounts, setHistory, setGameOver, setWinner, setShowWinner)}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default Cricket;
