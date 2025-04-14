// src/App.js
import React, { useState } from 'react';
import SettingsPage from './SettingsPage';
import TrackerPage from './TrackerPage';
import './App.css';

function App() {
  // State to track selected mode and number of players
  const [selectedMode, setSelectedMode] = useState('cricket');
  const [numPlayers, setNumPlayers] = useState(2); // Default to 2 players
  const [isModeSelected, setIsModeSelected] = useState(false);

  // Function to handle game mode selection change
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  // Function to handle number of players selection change
  const handlePlayersChange = (event) => {
    setNumPlayers(Number(event.target.value)); // Set players as a number
  };

  // Function to handle the "Confirm" button click
  const handleConfirm = () => {
    if (selectedMode && numPlayers) {
      setIsModeSelected(true);
    }
  };

  // Function to handle the "Back" button click
  const handleBack = () => {
    setIsModeSelected(false); // Reset to mode selection page
  };

  return (
    <div className="App">
      {!isModeSelected ? (
        <SettingsPage
          selectedMode={selectedMode}
          numPlayers={numPlayers}
          handleModeChange={handleModeChange}
          handlePlayersChange={handlePlayersChange}
          handleConfirm={handleConfirm}
        />
      ) : (
        <TrackerPage
          selectedMode={selectedMode}
          numPlayers={numPlayers}
          handleBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
