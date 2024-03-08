import React from 'react';
import "./carsPage.css";

export default function CarDetailsModalRow({handler, text, selected}) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handler();
    }
  };

  return (
    <div className={`carDetailsModal__row ${selected ? 'selected' : ''}`} onClick={handler} onKeyPress={handleKeyPress} tabIndex={0}>
      {text}
    </div>
  );
}
