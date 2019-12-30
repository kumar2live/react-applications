import React from 'react';

import burgerLogo from '../../../assets/images/burger-logo.png';

import CssClasses from './Logo.module.css';

const LogoComponent = (props) => {
  return (
    <div className={CssClasses.Logo} style={{height: props.height}}>
      <img src={burgerLogo} alt="logo"/>
    </div>
  );
}

export default LogoComponent;