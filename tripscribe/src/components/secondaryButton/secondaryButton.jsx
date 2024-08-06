import React from 'react';
import './secondaryButton.css';

const SecondaryButton = ({text, handleClick, style }) => {
  return (
    <div>
      <button 
        className={`buttonSecondary`} onClick={handleClick} style={style}>
          {text}
      </button>
    </div>
  );
}

export default SecondaryButton;