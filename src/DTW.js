import React, { useState } from 'react';
import { handleNameChange, handleTargetClick, handleUndoButton, resetState } from './gameLogic';

function DTW({ numPlayers }) {
  const [playerNames, setPlayerNames] = useState(
    Array.from({ length: numPlayers }, (_, i) => `P${i + 1}`)
  );

  const targets = ['Score', 20, 19, 18, 17, 16, 15, 'B', 'D', 'T', 'W'];
  const [scores, setScores] = useState(Array(numPlayers).fill(0));
  const [counts, setCounts] = useState(
    Array.from({ length: targets.length - 1 }, () => Array(numPlayers).fill(0))
  );
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [showWinner, setShowWinner] = useState(false);
  const [addScore, setAddScore] = useState(0);
  const [showAddScore, setShowAddScore] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);

  return (
    <div>
      {showWinner && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '2px solid black',
          zIndex: 1000
        }}>
          <h2>Game Over!</h2>
          <p>Winner: {winner}</p>
          <button onClick={() => setShowWinner(false)}>Close</button>
        </div>
      )}
      {showAddScore && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '2px solid black',
          zIndex: 1000
        }}>
          <h2>Enter Score</h2>
          <input
            type="number"
            min="1"
            placeholder="score"
            onChange={(e) => setAddScore(Number(e.target.value))} // Update target value
            style={{
              width: '100px',
              height: '30px',
              textAlign: 'center',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
          <button onClick={() => {
              handleTargetClick(selectedRow, selectedCol, counts, scores, targets, history, playerNames, numPlayers, addScore, setCounts, setScores, setHistory, setGameOver, setShowWinner, setWinner);
              setShowAddScore(false);
            }}>Submit</button>
        </div>
      )}
      <div style={{ width: 'fit-content', margin: '0 auto' }}>
        <table border="1" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
          <tbody>
            {Array.from({ length: targets.length + 1 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: numPlayers + 1 }).map((_, colIndex) => {
                  if (rowIndex === 0 && colIndex === 0) {
                    return <td key={colIndex} style={{ height: '34px', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}></td>;
                  } else if (rowIndex === 0 && colIndex >= 1) {
                    // Editable text fields for the first row's last numPlayers columns
                    return (
                      <td key={colIndex} style={{ height: '34px', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="text"
                          value={playerNames[colIndex - 1]}
                          onChange={(e) => handleNameChange(colIndex - 1, e.target.value, playerNames, setPlayerNames)}
                          disabled={gameOver}
                          style={{ textAlign: 'center', height: '34px', width: '60px' }}
                        />
                      </td>
                    );
                  } else if (rowIndex > 0 && colIndex === 0) {
                    return (
                      <td key={colIndex} style={{ height: '34px', textAlign: 'center', verticalAlign: 'middle' }}>
                        {targets[rowIndex - 1]}
                      </td>
                    );
                  } else if (rowIndex === 1 && colIndex > 0) {
                    return (
                      <td key={colIndex} style={{ height: '34px', textAlign: 'center', verticalAlign: 'middle' }}>
                        {scores[colIndex - 1]}
                      </td>
                    );
                  }
                  return (
                    <td key={colIndex} style={{ height: '34px', textAlign: 'center', verticalAlign: 'middle' }}>
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
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: counts[rowIndex - 2][colIndex - 1] >= 3 ? '#88E788' : '#FAFAFA', // Change to green if count >= 3
                        }}
                      >
                        {counts[rowIndex - 2][colIndex - 1]}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>
          <button onClick={() => handleUndoButton(history, gameOver, setHistory, setCounts, setScores, setGameOver)} disabled={history.length === 0}>Undo</button>
          <button onClick={() => resetState(numPlayers, targets, setScores, setCounts, setHistory, setGameOver, setWinner, setShowWinner)}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default DTW;
