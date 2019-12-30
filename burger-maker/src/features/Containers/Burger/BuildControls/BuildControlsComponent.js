import React from 'react';
import Controls from './Controls/Controls';
import CssClasses from './BuildControlsComponent.module.css';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const BuildControlsComponent = (props) => {
  return (
    <div className={CssClasses.BuildControls}>
      <p>Price <strong>${props.price.toFixed(2)}</strong></p>

      {controls.map((ctrl) => {
        return (
          <Controls 
            disabled={props.disabled[ctrl.type]}
            removed={() => props.ingrediantRemoved(ctrl.type)}
            added={() => props.ingrediantAdded(ctrl.type)}
            label={ctrl.label}
            key={ctrl.label}/>);
      })}

      <button
        onClick={props.orderClicked}
        disabled={!props.orderable}
        className={CssClasses.OrderButton}>ORDER NOW</button>
    </div>
  );
};

export default BuildControlsComponent;