import * as ActionTypes from '../actions/actionTypes';

import { updateObj } from '../../store/utility';

const initialState = {
  ingrediants: null,
  totalPrice: 4,
  error: false,
}

const INGREDIANT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 2.0,
}

// sample way to clean the switch case
const addIngrediant = (state, action) => {
   const updateIng = {[action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1};
   const updateIngs = updateObj(state.ingrediants, updateIng);
   const updatedState = {
     ingrediants: updateIngs,
     totalPrice: state.totalPrice + INGREDIANT_PRICES[action.ingrediantName],
   }
   return updateObj(state, updatedState);
}

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case ActionTypes.ADD_INGREDIANT:
      return addIngrediant(state, action);
    case ActionTypes.REMOVE_INGREDIANT:
      return {
        ...state,
        ingrediants: {
          ...state.ingrediants,
          [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIANT_PRICES[action.ingrediantName],
      }
    case ActionTypes.SET_INGREDIANTS:
      return {
        ...state,
        ingrediants: action.ingrediants,
        error: false,
        totalPrice: initialState.totalPrice,
      }
    case ActionTypes.FETCH_INGREDIANTS_FAILED:
      return updateObj(state, {error: true});
    case ActionTypes.RESET_INGREDIANTS:
      return initialState;
    default:
      return {...state};
  }
}

export default reducer;