import React, { useState } from 'react';

function Cricket({ selectedPlayers }) {
  const [playerNames, setPlayerNames] = useState(
    Array(selectedPlayers).fill('Player (click to edit)')
  );

  const targets = ['Score', 20, 19, 18, 17, 16, 15, 'B'];
  const [scores, setScores] = useState(Array(selectedPlayers).fill(0));
  const [counts, setCounts] = useState(
    Array.from({ length: targets.length - 1 }, () => Array(selectedPlayers).fill(0))
  );
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [showWinner, setShowWinner] = useState(false);

  const handleNameChange = (index, value) => {
    const updatedValues = [...playerNames];
    updatedValues[index] = value;
    setPlayerNames(updatedValues);
  };

  const handleButtonClick = (rowIndex, colIndex) => {
    // Save the current state to history before making changes
    setHistory([
      ...history,
      { counts: [...counts.map((row) => [...row])], scores: [...scores] }
    ]);

    // Record hit on a target
    const updatedCounts = [...counts];
    updatedCounts[rowIndex][colIndex] += 1;
    setCounts(updatedCounts);

    // Score on opponents if the target has been  hit more than 3 times
    const updatedScores = [...scores];
    if (counts[rowIndex][colIndex] > 3) {
      let value = targets[rowIndex + 1];
      if (value === 'B') {
        value = 25;
      }
      for (let i = 0; i < selectedPlayers; i++) {
        if (i !== colIndex && counts[rowIndex][i] < 3) {
          updatedScores[i] += value;
        }
      }
      setScores(updatedScores);
    }

    // Check if the player has won, if so, show the winner
    if (checkWinner(colIndex, updatedCounts, updatedScores)) {
      setGameOver(true);
      setShowWinner(true);
      setWinner(playerNames[colIndex]);
    }
  };

  const handleUndoButton = () => {
    if (gameOver) {
      setGameOver(false);
    }
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setCounts(lastState.counts);
      setScores(lastState.scores);
      setHistory(history.slice(0, -1)); // Remove the last state
    }
  };

  const checkWinner = (colIndex, counts, scores) => {
    // All target counts must be ≥ 3 for the player to win
    for (let i = 0; i < targets.length - 1; i++) {
      if (counts[i][colIndex] < 3) return false;
    }

    // Check if the player's score is the minimum
    return scores[colIndex] === Math.min(...scores);
  };

  const resetState = () => {
    setScores(Array(selectedPlayers).fill(0));
    setCounts(Array.from({ length: targets.length - 1 }, () => Array(selectedPlayers).fill(0)));
    setHistory([]);
    setGameOver(false);
    setWinner('');
    setShowWinner(false);
  }

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
      <table border="1">
        <tbody>
          {Array.from({ length: 7 + 2 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: selectedPlayers + 1 }).map((_, colIndex) => {
                if (rowIndex === 0 && colIndex === 0) {
                  return <td key={colIndex}></td>;
                } else if (rowIndex === 0 && colIndex >= 1) {
                  // Editable text fields for the first row's last selectedPlayers columns
                  return (
                    <td key={colIndex}>
                      <input
                        type="text"
                        value={playerNames[colIndex - 1] || ''}
                        onChange={(e) =>
                          handleNameChange(
                            colIndex - 1,
                            e.target.value
                          )
                        }
                        disabled={gameOver}
                      />
                    </td>
                  );
                }
                else if (rowIndex > 0 && colIndex === 0) {
                  return <td key={colIndex}>{targets[rowIndex-1]}</td>;
                }
                else if (rowIndex === 1 && colIndex > 0) {
                  return <td key={colIndex}>{scores[colIndex-1]}</td>;
                }
                return (
                  <td key={colIndex}>
                    <button onClick={() => handleButtonClick(rowIndex-2, colIndex-1)}
                      disabled={gameOver}> {counts[rowIndex-2][colIndex-1]}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleUndoButton} disabled={history.length === 0}>Undo</button>
      <button onClick={() => {resetState();}}>Clear</button>
    </div>
  );
}

export default Cricket;
