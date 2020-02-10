import React from 'react';
import { NavLink } from 'react-router-dom';

import CssClasses from './NavItem.module.css';

const NavItemComponent = (props) => {
  return (
    <li className={CssClasses.NavItem}>
      <NavLink exact
        activeClassName={CssClasses.active}
        to={props.link} >{props.children}</NavLink>
    </li>
  );
}

export default NavItemComponent;