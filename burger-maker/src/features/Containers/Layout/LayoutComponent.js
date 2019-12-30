import React, { Component } from 'react';

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
        <SideDrawerComponent open={this.state.showSideDrawer} closed={this.sideDrawerHandler}/>
        
        <ToolBarComponent openMenu={this.openMenuHandler} />
        <main className={layoutStyles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default LayoutComponent;