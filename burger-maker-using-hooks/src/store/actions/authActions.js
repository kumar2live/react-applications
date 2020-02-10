import * as actionTypes from './actionTypes';

import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId,
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOG_OUT,
  }
}

export const checkAuthTimeOut = (timeData) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), timeData * 1000);
  }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());

    let url = 'replacehere';

    url = isSignUp ? url : 'replacehere';

    const authData = {
      email: email, password: password, returnSecureToken: true,
    }

    axios.post(url, authData).then((response) => {
      // console.log(response);
      const expDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expiryDate', expDate);
      localStorage.setItem('userId', response.data.localId);

      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeOut(response.data.expiresIn));
    }).catch((error) => {
      // console.log(error);
      dispatch(authFailed(error.response.data.error));
    })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expiryDate = localStorage.getItem('expiryDate');
      if (expiryDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess({idToken: token, localId: userId}));
        dispatch(checkAuthTimeOut((new Date(expiryDate).getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
