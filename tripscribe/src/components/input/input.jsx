import React from 'react';
import './input.css';

export const Input = ({ labelText, inputType, placeholderText, name, className, style, readOnly = false, value = '', onChange}) =>{
  return (
    <div className='labelAndInputDiv'>
      <label className='labelText'>{labelText}</label>
      <input 
      className={`inputField ${className}`}   
      type={inputType} 
      placeholder={placeholderText} 
      name={name} 
      style={style}
      readOnly={readOnly}
      value = {value}
      onChange={onChange}
      />
    </div>
  );
}