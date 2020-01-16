import * as actionTypes from './actions';

export const increment = () => {
  return {
    type: actionTypes.INCREMENT,
  }
};

export const decrement = () => {
  return {
    type: actionTypes.DECREMENT,
  }
};

export const addfive = (payload) => {
  return {
    type: actionTypes.ADD_FIVE, value: payload
  }
};

export const subfive = (payload) => {
  return {
    type: actionTypes.SUB_FIVE, value: payload
  }
};