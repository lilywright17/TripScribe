import React from 'react';
import './secondaryButton.css';

export const SecondaryButton = ({ text, handleClick, style, icon, className = '', ...props }) => {
  return (
    <div>
      <button 
        className={`buttonSecondary ${className}`} 
        onClick={handleClick} 
        style={style}
        {...props} 
      >
        {icon && <span className="button-icon">{icon}</span>}
        {text}
      </button>
    </div>
  );
}
