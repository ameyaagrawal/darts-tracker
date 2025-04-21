import React, { useState } from 'react';
import { handleNameChange, handleTargetClick, handleUndoButton, resetState, images, colors } from './gameLogic';

function DTW({ numPlayers, targets, playerNames, setPlayerNames, counts, setCounts, scores, setScores, history, setHistory, gameOver, setGameOver, winner, setWinner, showWinner, setShowWinner }) {
  const [addScore, setAddScore] = useState(0);
  const [showAddScore, setShowAddScore] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);

  return (
    <div className="page-container">
      {showWinner && (
        <div className="popup-window">
          <h2>Game Over!</h2>
          <p>Winner: {winner}</p>
          <button onClick={() => setShowWinner(false)}>Close</button>
        </div>
      )}
      {showAddScore && (
        <div className="popup-window">
          <h2>Enter Score</h2>
          <input
            type="tel"
            inputMode="numeric"
            min="1"
            placeholder="Score"
            onChange={(e) => setAddScore(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTargetClick(selectedRow, selectedCol, counts, scores, targets, history, playerNames, numPlayers, Number(e.target.value), setCounts, setScores, setHistory, setGameOver, setShowWinner, setWinner);
                setShowAddScore(false);
              }
            }}
            className="dtw-score-input"
          />
          <button onClick={() => {
              handleTargetClick(selectedRow, selectedCol, counts, scores, targets, history, playerNames, numPlayers, addScore, setCounts, setScores, setHistory, setGameOver, setShowWinner, setWinner);
              setShowAddScore(false);
            }}>Enter</button>
        </div>
      )}
      <div className='tracker-container'>
        <table className='tracker-table' border="1">
          <tbody>
            {Array.from({ length: targets.length + 1 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: numPlayers + 1 }).map((_, colIndex) => {
                  if (rowIndex === 0 && colIndex === 0) {
                    return <td key={colIndex}></td>;
                  } else if (rowIndex === 0 && colIndex >= 1) {
                    // Editable text fields for the first row's last numPlayers columns
                    return (
                      <td key={colIndex} className='dtw-names'>
                        <input
                          type="text"
                          value={playerNames[colIndex - 1]}
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
                          className='dtw-name-input'
                        />
                      </td>
                    );
                  } else if (rowIndex === 1 && colIndex === 0) {
                    return (
                      <td key={colIndex} className="dtw-scoress">
                        Scores
                      </td>
                    );
                  } else if (rowIndex === 1) {
                    return (
                      <td key={colIndex} className="dtw-scores">
                        {scores[colIndex - 1]}
                      </td>
                    );
                  } else if (rowIndex > 1 && colIndex === 0) {
                    return (
                      <td key={colIndex} className='dtw-targets'>
                        {targets[rowIndex - 1]}
                      </td>
                    );
                  }
                  return (
                    <td key={colIndex} className='dtw-cell'>
                      <button
                        onClick={() => {
                          /// Check if the target is a special case (D, T, W) which might require a popup
                          if (9 <= rowIndex && rowIndex <= 11
                            && counts[rowIndex - 2][colIndex - 1] >= 3
                            && Math.min(...counts[rowIndex - 2]) < 3) {
                            setSelectedRow(rowIndex - 2);
                            setSelectedCol(colIndex - 1);
                            setShowAddScore(true);
                          } else {
                            handleTargetClick(rowIndex - 2, colIndex - 1, counts, scores, targets, history, playerNames, numPlayers, 0, setCounts, setScores, setHistory, setGameOver, setShowWinner, setWinner);
                          }
                        }}
                        disabled={gameOver || showAddScore}
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

export default DTW;
