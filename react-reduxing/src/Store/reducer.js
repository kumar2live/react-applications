import * as actionTypes from './actions/actions';

const initialState = {
  counter: 0,
  results: [],
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
      return {
        ...state, counter: state.counter + action.value,
      };
    case actionTypes.SUB_FIVE:
      return {
        ...state, counter: state.counter - action.value,
      };
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: (new Date()), value: state.counter}),
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

      default:
        return state;
  }
}

export default reducer;