import React from 'react';
import './button.css';

const Button = ({text, handleClick, style }) => {
  return (
    <div>
      <button 
        className={`buttonPrimary`} onClick={handleClick} style={style}>
          {text}
      </button>
    </div>
  );
}

export default Button;



/* In order to use this button component you will need to:
1. Import it in the file you want to use it in
2. Use it in the file you want to use it in by calling it as a component

eg. <Button text="ENTER YOUR TEXT HERE!" handleClick={ENTER FUNCTION NAME HERE} />

making sure to pass any necessary props to the component eg text, handleClick, style (otherwise button.css will apply).

*/