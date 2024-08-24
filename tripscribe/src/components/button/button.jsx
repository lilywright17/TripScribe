import React from 'react';
import './button.css';

export const Button = ({ text, handleClick, style, icon, className = '', ...props }) => {
  return (
    <div>
      <button 
        className={`buttonPrimary ${className}`} 
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