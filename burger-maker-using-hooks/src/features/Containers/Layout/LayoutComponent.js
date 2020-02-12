import React, { useState } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import ToolBarComponent from '../../Components/Navigation/Toolbar/ToolBarComponent';
import SideDrawerComponent from '../../Components/Navigation/SideDrawer/SideDrawerComponent';

import layoutStyles from './Layout.module.css';

const LayoutComponent = (props) => {
  const [showSideDrawer, setshowSideDrawer] = useState(false);
  
  const sideDrawerHandler = () => {
    setshowSideDrawer(false);
  }

  const openMenuHandler = () => {
    setshowSideDrawer(!showSideDrawer);
  }

  return (
    <Aux>
      <SideDrawerComponent open={showSideDrawer} ordersCount={props.ordersCount} authenticated={props.authenticated} 
        closed={sideDrawerHandler} />
      
      <ToolBarComponent openMenu={openMenuHandler} ordersCount={props.ordersCount} authenticated={props.authenticated} />
      <main className={layoutStyles.Content}>
        {props.children}
      </main>
    </Aux>
  );
}

const mapPropsToState = (state) => {
  return {
    authenticated: state.auth.token !== null,
    ordersCount: state.order.orders.length,
  }
}

export default connect(mapPropsToState)(LayoutComponent);