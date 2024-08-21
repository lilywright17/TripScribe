import React from 'react';
import './input.css';

export const Input = ({ labelText, inputType, placeholderText, name, className, style, readOnly = false, value = ''}) =>{
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
      />
    </div>
  );
}

/*

In order to use the above component you will need to:
- Import the component in the file where you want to use it
- Call the component and pass the required props e.g. 

<Input labelText="Email" inputType="email" placeholderText="Enter your email" />

- The above code will render an input field with a label and placeholder text
*/