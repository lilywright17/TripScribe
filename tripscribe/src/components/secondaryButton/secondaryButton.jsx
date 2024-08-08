import React from 'react';
import './secondaryButton.css';

const SecondaryButton = ({ text, handleClick, style, icon }) => {
  return (
    <div>
      <button 
        className={`buttonSecondary`} 
        onClick={handleClick} 
        style={style}
      >
        {icon && <span className="button-icon">{icon}</span>}
        {text}
      </button>
    </div>
  );
}

export default SecondaryButton;
