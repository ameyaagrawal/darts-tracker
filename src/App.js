// src/App.js
import React, { useState } from 'react';
import SettingsPage from './SettingsPage';
import TrackerPage from './TrackerPage';

function App() {
  // State to track selected mode and number of players
  const [selectedMode, setSelectedMode] = useState('cricket');
  const [selectedPlayers, setSelectedPlayers] = useState(2); // Default to 2 players
  const [isModeSelected, setIsModeSelected] = useState(false);

  // Function to handle game mode selection change
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  // Function to handle number of players selection change
  const handlePlayersChange = (event) => {
    setSelectedPlayers(Number(event.target.value)); // Set players as a number
  };

  // Function to handle the "Confirm" button click
  const handleConfirm = () => {
    console.log('Confirm button clicked');
    if (selectedMode && selectedPlayers) {
      setIsModeSelected(true);
    }
  };

  // Function to handle the "Back" button click
  const handleBack = () => {
    console.log('Back button clicked');
    setIsModeSelected(false); // Reset to mode selection page
    setSelectedMode(selectedMode); // Clear selected mode
    setSelectedPlayers(selectedPlayers); // Reset to default 2 players
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>Darts Tracker</h1>
      {!isModeSelected ? (
        <SettingsPage
          selectedMode={selectedMode}
          selectedPlayers={selectedPlayers}
          handleModeChange={handleModeChange}
          handlePlayersChange={handlePlayersChange}
          handleConfirm={handleConfirm}
        />
      ) : (
        <TrackerPage
          selectedMode={selectedMode}
          selectedPlayers={selectedPlayers}
          handleBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
