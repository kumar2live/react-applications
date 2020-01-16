import * as actionTypes from './actions';

export const saveResult = (payload) => {
  return {
    type: actionTypes.STORE_RESULT, value: payload,
  }
}

export const storeresult = (payload) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      // const oldCounter = getState().ctr.counter;
      // console.log(oldCounter);
      dispatch(saveResult(payload));
    }, 1000);
  }
};

export const deleteresult = (payload) => {
  return {
    type: actionTypes.DELETE_RESULT, value: payload
  }
};