import * as actionTypes from './actionTypes';
import OrderxAxios from '../../axios-orders';

export const orderSuccess = (ID, orderData) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    orderID: ID,
    orderData: orderData,
  }
}

export const orderFailed = (payload) => {
  return {
    type: actionTypes.ORDER_FAILED,
    error: payload,
  }
}

export const orderInitiate = () => {
  return {
    type: actionTypes.ORDER_INITATE,
  }
}

export const orderBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(orderInitiate());

    OrderxAxios.post('/orders.json?auth=' + token, orderData).then((response) => {
      dispatch(orderSuccess (response.data.name, orderData));
    }).catch((error) => {
      dispatch(orderFailed(error));
    });
  }
}

export const orderInit = () => {
  return {
    type: actionTypes.ORDER_INIT,
  }
}

// orders page
export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  }
}

export const fetchOrdersSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: payload,
  }
}

export const fetchOrdersFailed = (payload) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: payload,
  }
}

export const fetchOrders = (token, userId) => {
  return (dispatch, _getState) => {
    dispatch(fetchOrdersInit());
    // one way to get the state inside but not advisable
    // console.log(_getState().auth.token);
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    OrderxAxios.get('/orders.json' + queryParams).then((response) => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    }).catch((error) => {
      dispatch(fetchOrdersFailed(error));
    });
  }
}

// orders delete
export const deleteOrdersInit = () => {
  return {
    type: actionTypes.DELETE_ORDERS_INIT,
  }
}

export const deleteOrdersSuccess = () => {
  return {
    type: actionTypes.DELETE_ORDERS_SUCCESS,
  }
}

export const deleteOrdersFailed = () => {
  return {
    type: actionTypes.DELETE_ORDERS_FAILED,
  }
}

export const deleteOrder = (orderID, token) => {
  return (dispatch) => {
    dispatch(deleteOrdersInit());

    OrderxAxios.delete('/orders/' + orderID + '.json?auth=' + token).then((response) => {
      // console.log('res --- ', response);
      dispatch(fetchOrders(token));
    }).catch((error) => {
      // console.log('err -- ', error);
      dispatch(deleteOrdersFailed(error));
    });
  }
}