import React from 'react';

import CssClasses from './Nav.module.css';

import NavItemComponent from './NavItem/NavItemComponent';

const NavComponent = (props) => {
  return (
    <ul className={CssClasses.Navigation}>
      <NavItemComponent link="/">Burger Builder</NavItemComponent>
      {props.authenticated ? <NavItemComponent link="/orders">
        Orders {props.ordersCount && props.ordersCount > 0 ? `(${(props.ordersCount)})` : null}
      </NavItemComponent> : null}
      {/* {props.authenticated ? <NavItemComponent link="/orders">Orders</NavItemComponent> : null} */}
      {!props.authenticated
        ? <NavItemComponent link="/auth">Login</NavItemComponent>
        : <NavItemComponent link="/logout">Logout</NavItemComponent>}
    </ul>
  );
}

export default NavComponent;