import React from 'react';

import CssClasses from './Controls.module.css';

const Controls = (props) => {
  return (
    <div className={CssClasses.BuildControl}>
      <div className={CssClasses.Label}> {props.label} </div>
      <button
        disabled={props.disabled}
        onClick={props.removed}
        className={CssClasses.Less}>Less</button>
      <button
        onClick={props.added}
        className={CssClasses.More}>More</button>
    </div>
  );
};

export default Controls;