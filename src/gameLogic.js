import img0 from './img/0.png';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';

export const images = [img0, img1, img2, img3];
export const colors = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"];

export const handleNameChange = (index, value, playerNames, setPlayerNames) => {
    const updatedValues = [...playerNames];
    updatedValues[index] = value;
    setPlayerNames(updatedValues);
};

export const handleTargetClick = (rowIndex, colIndex, counts, scores, targets, history, playerNames, numPlayers, addScore, setCounts, setScores, setHistory, setGameOver, setShowWinner, setWinner) => {
    // Save the current state to history before making changes
    updateHistory(history, counts, scores, setHistory);

    // Record hit on a target
    const updatedCounts = [...counts];
    updatedCounts[rowIndex][colIndex] += 1;
    setCounts(updatedCounts);

    // Score on opponents if the target has been hit more than 3 times and others haven't
    const updatedScores = [...scores];
    let value = targets[rowIndex + 1];
    if (value === 'B') {
        value = 25;
    } else if (value === 'D' || value === 'T' || value === 'W') {
        value = Math.floor(Math.min(180, Math.max(0, addScore)));
    }
    if (updatedCounts[rowIndex][colIndex] > 3) {
        for (let i = 0; i < numPlayers; i++) {
            if (updatedCounts[rowIndex][i] < 3) {
                updatedScores[i] += value;
            }
        }
        setScores(updatedScores);
    }

    // Check if any player has won, if so, show the winner
    let winner = checkWinner(updatedCounts, updatedScores, targets, playerNames);
    if (winner !== "") {
        setGameOver(true);
        setShowWinner(true);
        setWinner(winner);
    }
};

export const checkWinner = (counts, scores, targets, playerNames) => {
  // All target counts must be ≥ 3 for the player to win + minimum score
  for (let colIndex = 0; colIndex < counts[0].length; colIndex++) {
    let winner = true;
    for (let i = 0; i < targets.length - 1; i++) {
        if (counts[i][colIndex] < 3) {
            winner = false;
            break;
        }
    }
    if (winner && scores[colIndex] === Math.min(...scores)) {
        return playerNames[colIndex];
    }
  }

  return "";
};

export const handleUndoButton = (history, gameOver, setHistory, setCounts, setScores, setGameOver) => {
    if (gameOver) {
        setGameOver(false);
    }
    if (history.length > 0) {
    const lastState = history.pop();
    setCounts(lastState.counts);
    setScores(lastState.scores);
  }
};


export const resetState = (numPlayers, targets, history, counts, scores, setScores, setCounts, setHistory, setGameOver, setWinner, setShowWinner) => {
    updateHistory(history, counts, scores, setHistory);
    setScores(Array(numPlayers).fill(0));
    setCounts(Array.from({ length: targets.length - 1 }, () => Array(numPlayers).fill(0)));
    setGameOver(false);
    setWinner('');
    setShowWinner(false);
  }


export const updateHistory = (history, counts, scores, setHistory) => {
    // Save the current state to history before making changes
    if (history.length < 10) {
        setHistory([
            ...history,
            { counts: [...counts.map((row) => [...row])], scores: [...scores] }
        ]);
    } else {  // keep only the last 5 states
        setHistory([
            ...history.slice(1,),
            { counts: [...counts.map((row) => [...row])], scores: [...scores] }
        ]);
    }
}