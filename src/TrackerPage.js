import React, { useState, useEffect } from 'react';
import Cricket from './Cricket';
import DTW from './DTW';

function TrackerPage({ selectedMode, numPlayers, handleBack }) {
  const [playerNames, setPlayerNames] = useState(
    Array.from({ length: numPlayers }, (_, i) => `P${i + 1}`)
  );
  let targets = [];
  if (selectedMode === 'cricket') {
    targets = ['Score', 20, 19, 18, 17, 16, 15, 'B'];
  } else {
    targets = ['Score', 20, 19, 18, 17, 16, 15, 'B', 'D', 'T', 'W'];
  }
  const [counts, setCounts] = useState(
      Array.from({ length: targets.length - 1 }, () => Array(numPlayers).fill(0))
    );
  const [scores, setScores] = useState(Array(numPlayers).fill(0));
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [showWinner, setShowWinner] = useState(false);

  // Set the number of rows and columns as CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--num-rows', targets.length + 2);
    document.documentElement.style.setProperty('--num-cols', numPlayers + 1);
  }, [targets.length, numPlayers]);

  return (
    <div>
      {selectedMode === 'cricket' ? (
        <div>
          <h1>Cricket</h1>
          <Cricket
            numPlayers={numPlayers}
            targets={targets}
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
            counts={counts}
            setCounts={setCounts}
            scores ={scores}
            setScores={setScores}
            history={history}
            setHistory={setHistory}
            gameOver={gameOver}
            setGameOver={setGameOver}
            winner={winner}
            setWinner={setWinner}
            showWinner={showWinner}
            setShowWinner={setShowWinner}
          />
        </div>
      ) : (
        <div>
          <h1>DTW</h1>
          <DTW
            numPlayers={numPlayers}
            targets={targets}
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
            counts={counts}
            setCounts={setCounts}
            scores ={scores}
            setScores={setScores}
            history={history}
            setHistory={setHistory}
            gameOver={gameOver}
            setGameOver={setGameOver}
            winner={winner}
            setWinner={setWinner}
            showWinner={showWinner}
            setShowWinner={setShowWinner}
          />
        </div>
      )}
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to go back?')) {
            handleBack();
          }
        }}
      >
        Back
      </button>
    </div>
  );
}

export default TrackerPage;
