import React from 'react';
import CssStyles from './CounterOutput.module.css'


const CounterOutput = (props) => {

  return (
    <div className={CssStyles.CounterOutput}>
      <p>Counter: {props.value}</p>
    </div>
  );
}

export default CounterOutput;