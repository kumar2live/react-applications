import * as actionTypes from '../actions';

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: (new Date()), value: action.value}),
      }
    case actionTypes.DELETE_RESULT:
      // const id = 2;
      // const newArr = [...state.results];
      // newArr.splice(id, 1);

      const newResArr = state.results.filter((res, _index) => {
        return action.value !== res.id;
      });

      return {
        ...state,
        results: newResArr,
      }
  }

  return state;
}

export default reducer;