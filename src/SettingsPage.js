import React from 'react';
import ModeSelect from './ModeSelect';
import PlayerSelect from './PlayerSelect';

function SettingsPage({
  selectedMode,
  selectedPlayers,
  handleModeChange,
  handlePlayersChange,
  handleConfirm
}) {
  return (
    <div>
      <ModeSelect selectedMode={selectedMode} handleModeChange={handleModeChange} />
      <PlayerSelect selectedPlayers={selectedPlayers} handlePlayersChange={handlePlayersChange} />
      <button
        onClick={handleConfirm}
        disabled={!selectedMode || !selectedPlayers}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        Confirm
      </button>
    </div>
  );
}

export default SettingsPage;
