import React from 'react';

import CssClasses from './Buttons.module.css';

const ButtonsComponent = (props) => {
  return (
    <div style={{display: 'inline'}}>
      <button
        disabled={props.btnDisabled}
        onClick={props.btnClicked}
        className={[CssClasses.Button, CssClasses[props.btnType]].join(' ')}
        >{props.children}</button>
    </div>
  );
}

export default ButtonsComponent;
