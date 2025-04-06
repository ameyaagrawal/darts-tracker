import React, { useState } from 'react';

function DTW({ selectedPlayers }) {
  const [editableValues, setEditableValues] = useState(
    Array(selectedPlayers).fill('')
  );

  const handleInputChange = (index, value) => {
    const updatedValues = [...editableValues];
    updatedValues[index] = value;
    setEditableValues(updatedValues);
  };

  return (
    <table border="1">
      <tbody>

      </tbody>
    </table>
  );
}

export default DTW;