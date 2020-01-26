import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import * as ActionTypes from '../../../../store/actions/index';

class LogoutComponent extends Component {
  componentDidMount () {
    this.props.resetAppState();
    this.props.onLogout();
  }

  render () {
    return (
      <React.Fragment>
        <p> Loggin out ...! :( </p>

        <Redirect to="/" />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(ActionTypes.logout()),
    resetAppState: () => dispatch(ActionTypes.resetAppState()),
  }
}

export default connect(null, mapDispatchToProps)(LogoutComponent);