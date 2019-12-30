import React, { Component } from 'react';

import LayoutComponent from './features/Containers/Layout/LayoutComponent';
import BurgerBuilderComponent from './features/Containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  state = {
    showComp: true,
  }

  render () {
    return (
      <div className="App">
        <LayoutComponent>
          {this.state.showComp ? <BurgerBuilderComponent /> : null}
        </LayoutComponent>
      </div>
    );
  };

}

export default App;
