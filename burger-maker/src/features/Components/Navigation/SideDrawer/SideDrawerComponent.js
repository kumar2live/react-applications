import React from 'react';

import NavItemComponent from '../Nav/NavItem/NavItemComponent';
import LogoComponent from '../../Logo/LogoComponent';
import BackDropComponent from '../../UIElments/BackDrop/BackDropComponent';
import Aux from '../../../hoc/Aux';
import CssClasses from './SideDrawer.module.css';

const SideDrawerComponent = (props) => {
  let attachedClasses = [CssClasses.SideDrawer, CssClasses.Close];

  if (props.open) {
    attachedClasses = [CssClasses.SideDrawer, CssClasses.Open]
  }

  return (
    <Aux>
      <BackDropComponent show={props.open} backDropClicked={props.closed}/>

      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={CssClasses.Logo}>
          <LogoComponent />
        </div>
        <nav>
          <NavItemComponent link="/">Burger Builder</NavItemComponent>
          {props.authenticated ? <NavItemComponent link="/orders">Orders</NavItemComponent> : null}
          
          {!props.authenticated
            ? <NavItemComponent link="/auth">Login</NavItemComponent>
            : <NavItemComponent link="/logout">Logout</NavItemComponent>}
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawerComponent;