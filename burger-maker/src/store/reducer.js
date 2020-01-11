import * as ActionTypes from './actions';

const initialState = {
  ingrediants: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
}

const INGREDIANT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 2.0,
}

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case ActionTypes.ADD_INGREDIANT:
      return {
        ...state,
        ingrediants: {
          ...state.ingrediants,
          [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIANT_PRICES[action.ingrediantName],
      }
    case ActionTypes.REMOVE_INGREDIANT:
      return {
        ...state,
        ingrediants: {
          ...state.ingrediants,
          [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIANT_PRICES[action.ingrediantName],
      }
    case ActionTypes.RESET_INGREDIANTS:
      return initialState;
    default:
      return {...state};
  }
}

export default reducer;