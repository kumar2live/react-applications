import React from 'react';
import CssStyles from './CounterControl.module.css'

const CounterControl = (props) => {

  return (
    <div className={CssStyles.CounterControl} onClick={props.clicked}>
      {props.label}
    </div>
  );
}

export default CounterControl;