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

export const orderBurger = (orderData) => {
  return (dispatch) => {
    dispatch(orderInitiate());

    OrderxAxios.post('/orders.json', orderData).then((response) => {
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

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersInit());

    OrderxAxios.get('/orders.json').then((response) => {
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

export const deleteOrder = (orderID) => {
  return (dispatch) => {
    dispatch(deleteOrdersInit());

    OrderxAxios.delete('/orders/' + orderID + '.json').then((response) => {
      // console.log('res --- ', response);
      dispatch(fetchOrders());
    }).catch((error) => {
      // console.log('err -- ', error);
      dispatch(deleteOrdersFailed(error));
    });
  }
}