import * as actionTypes from './actionTypes';
import OrderxAxios from '../../axios-orders';

export const addIngrediant = (payload) => {
  return {
    type: actionTypes.ADD_INGREDIANT,
    ingrediantName: payload,
  }
}

export const removeIngrediant = (payload) => {
  return {
    type: actionTypes.REMOVE_INGREDIANT,
    ingrediantName: payload,
  }
}

export const resetIngrediant = () => {
  return {
    type: actionTypes.RESET_INGREDIANTS,
  }
}

export const fetchIngrediantsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIANTS_FAILED,
  }
}

export const setIngrediants = (payload) => {
  return {
    type: actionTypes.SET_INGREDIANTS,
    ingrediants: payload,
  }
}

export const fetchIngrediants = () => {
  return (dispatch) => {
    OrderxAxios.get('/ingrediants.json').then((response) => {
      dispatch(setIngrediants(response.data));
    }).catch((error) => {
      dispatch(fetchIngrediantsFailed());
    });
  }
}