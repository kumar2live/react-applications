import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_INIT:
      return {
        ...state, purchased: false,
      }
    case actionTypes.ORDER_INITATE:
      return {
        ...state, loading: true,
      }
    case actionTypes.ORDER_SUCCESS:
      const orderInfo = {...action.orderData, id: action.orderID}
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(orderInfo),
        purchased: true,
      };
    case actionTypes.ORDER_FAILED:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.FETCH_ORDERS_INIT:
    case actionTypes.DELETE_ORDERS_INIT:
      return {
        ...state, loading: true,
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state, orders: action.orders, loading: false,
      }
    case actionTypes.FETCH_ORDERS_FAILED:
    case actionTypes.DELETE_ORDERS_FAILED:
    case actionTypes.DELETE_ORDERS_SUCCESS:
      return {
        ...state, loading: false,
      }
    default:
      return state;
  }
}

export default reducer;