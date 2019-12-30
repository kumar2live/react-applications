import React from 'react';

import CssClasses from './NavItem.module.css';

const NavItemComponent = (props) => {
  return (
    <li className={CssClasses.NavItem}>
      <a href={props.link} className={props.active ? CssClasses.active : null} >{props.children}</a>
    </li>
  );
}

export default NavItemComponent;