import React from 'react';
import ModeSelect from './ModeSelect';
import PlayerSelect from './PlayerSelect';

function SettingsPage({
  selectedMode,
  numPlayers,
  handleModeChange,
  handlePlayersChange,
  handleConfirm
}) {
  return (
    <div>
      <ModeSelect selectedMode={selectedMode} handleModeChange={handleModeChange} />
      <PlayerSelect numPlayers={numPlayers} handlePlayersChange={handlePlayersChange} />
      <button
        onClick={handleConfirm}
        disabled={!selectedMode || !numPlayers}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        Confirm
      </button>
    </div>
  );
}

export default SettingsPage;
