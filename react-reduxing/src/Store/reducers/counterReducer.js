import * as actionTypes from '../actions/actions';

import { updateObject } from '../utility';

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state, counter: state.counter + 1,
      };
    case actionTypes.DECREMENT:
      return {
        ...state, counter: state.counter - 1,
      };
    case actionTypes.ADD_FIVE:
      return updateObject(state, {counter: state.counter + action.value});
    case actionTypes.SUB_FIVE:
      return updateObject(state, {counter: state.counter - action.value});
    default:
      return state;
  }

  
}

export default reducer;