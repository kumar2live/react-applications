import * as actionTypes from '../actions/actions';

import { updateObject } from '../utility';

const initialState = {
  results: [],
};

const deleteResult = (state, action) => {
  // const id = 2;
  // const newArr = [...state.results];
  // newArr.splice(id, 1);
  const newResArr = state.results.filter((res, _index) => {
    return action.value !== res.id;
  });
  return newResArr;
}

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(state, {results: state.results.concat({id: (new Date()), value: action.value})});
    case actionTypes.DELETE_RESULT:
      return {
        ...state,
        results: deleteResult(state, action),
      }
    default:
      return state;
  }

  
}

export default reducer;