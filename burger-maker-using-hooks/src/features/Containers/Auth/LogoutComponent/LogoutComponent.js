import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import * as ActionTypes from '../../../../store/actions/index';

const LogoutComponent = (props) => {
  useEffect(() => {
    props.resetAppState();
    props.onLogout();
  }, []);

  return (
    <React.Fragment>
      <p> Loggin out ...! :( </p>

      <Redirect to="/" />
    </React.Fragment>
  );

}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(ActionTypes.logout()),
    resetAppState: () => dispatch(ActionTypes.resetAppState()),
  }
}

export default connect(null, mapDispatchToProps)(LogoutComponent);