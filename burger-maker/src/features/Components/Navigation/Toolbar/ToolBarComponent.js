import React from 'react';

import CssClasses from './ToolBar.module.css';

import LogoComponent from '../../Logo/LogoComponent';
import NavComponent from '../Nav/NavComponent';
import DrawerToggleComponent from '../SideDrawer/DrawerToggleComponent/DrawerToggleComponent';

const ToolBarComponent = (props) => {
  return (
    <div>
      <header className={CssClasses.Toolbar}>
        <DrawerToggleComponent clicked={props.openMenu} />
        <div className={CssClasses.Logo} style={{display: 'contents'}}><LogoComponent /></div>

        <nav className={CssClasses.DesktopOnly}>
          <NavComponent authenticated={props.authenticated} ordersCount={props.ordersCount}/>
        </nav>
      </header>
    </div>
  );
}

export default ToolBarComponent;