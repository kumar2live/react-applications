import React from 'react';

import CssClasses from './Nav.module.css';

import NavItemComponent from './NavItem/NavItemComponent';

const NavComponent = (props) => {
  return (
    <ul className={CssClasses.Navigation}>
      <NavItemComponent link="/" active>Burger Builder</NavItemComponent>
      <NavItemComponent link="/">Check Out</NavItemComponent>
    </ul>
  );
}

export default NavComponent;