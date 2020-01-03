import React, { Component } from 'react';

import '../../App.css';

class ChildrenComponentOne extends Component {

  render() {
    return (
      <React.Fragment>
        ChildrenComponentOne
      </React.Fragment>
    );
  }
}

export default ChildrenComponentOne;