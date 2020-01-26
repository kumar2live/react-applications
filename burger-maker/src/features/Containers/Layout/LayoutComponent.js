import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import ToolBarComponent from '../../Components/Navigation/Toolbar/ToolBarComponent';
import SideDrawerComponent from '../../Components/Navigation/SideDrawer/SideDrawerComponent';

import layoutStyles from './Layout.module.css';

class LayoutComponent extends Component {
  state = {
    showSideDrawer: false,
  }
  
  sideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false,
    })
  }

  openMenuHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render () {

    return (
      <Aux>
        <SideDrawerComponent open={this.state.showSideDrawer} ordersCount={this.props.ordersCount} authenticated={this.props.authenticated} 
          closed={this.sideDrawerHandler} />
        
        <ToolBarComponent openMenu={this.openMenuHandler} ordersCount={this.props.ordersCount} authenticated={this.props.authenticated} />
        <main className={layoutStyles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    authenticated: state.auth.token !== null,
    ordersCount: state.order.orders.length,
  }
}

export default connect(mapPropsToState)(LayoutComponent);