import React from 'react';
import CssStyles from './Input.module.css';

const InputComponent = (props) => {
  let inputElem = null;
  let errorElem = null;
  // console.log(props);

  const inputClasses = [CssStyles.InputElem];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(CssStyles.Invalid);
    errorElem = (<span style={{color: '#ab0c0c'}}>Please enter valid inputs.!</span>);
  }

  switch(props.elemType) {
    case ('input'):
    case ('email'):
      inputElem = (<input onChange={props.propertyChanged}  className={inputClasses.join(' ')} {...props.elemConfig} value={props.value}/>);
      break;
    case ('textarea'):
      inputElem = (<textarea onChange={props.propertyChanged} className={inputClasses.join(' ')} {...props.elemConfig} value={props.value} />);
      break;
    case ('select'):
      inputElem = (
        <select onChange={props.propertyChanged} className={inputClasses.join(' ')} value={props.value}>
          {props.elemConfig.options.map((opt) => {
            return (
              <option key={opt.value} value={opt.value}> {opt.displayValue} </option>
            );
          })}
        </select>
        );
      break;
    default:
      inputElem = (<input onChange={props.propertyChanged} className={inputClasses.join(' ')} {...props.elemConfig} value={props.value}/>);
  }

  return (
    <div className={CssStyles.Input} >
      <label className={CssStyles.Label} htmlFor={props.name}>{props.label}</label>
      {inputElem}
      {errorElem}
    </div>
  );
}

export default InputComponent;