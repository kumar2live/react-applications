import React from 'react';

import CssClasses from './DrawerToggle.module.css';

const DrawerToggleComponent = (props) => {
  return (
    <div className={CssClasses.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default DrawerToggleComponent;