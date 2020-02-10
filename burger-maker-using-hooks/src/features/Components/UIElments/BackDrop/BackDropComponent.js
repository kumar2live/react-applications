import React from 'react';

import CssClasses from './BackDrop.module.css';

const BackDropComponent = (props) => {
  
  const elem = props.show ?
    <div onClick={props.backDropClicked}
       className={CssClasses.BackDrop}></div>
    : null;

  return (
    <div>{elem}</div>
  );
}

export default BackDropComponent;