import React, { useEffect } from 'react';
import OrderxAxios from '../../../axios-orders';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';

import SpinnerComponent from '../../Components/UIElments/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Order from '../../Components/Orders/Order';
import './Orders.css';

const OrdersComponent = (props) => {
  useEffect(() => {
    if (props.token && props.userId) {
      props.onFetchOrders(props.token, props.userId);
    }
  }, []);

  const deleteOrderHandler = (orderID) => {
    props.onDeleteOrder(orderID, props.token, props.userId);
  }

  let elem = null;
  const noOrders = (<p style={{textAlign: 'center'}}>No orders found.</p>);

  if (props.loading) {
    elem = (<SpinnerComponent />);
  } else {
    elem = (

      <div className="Orders">

        {props.orders && props.orders.length === 0 ? noOrders : null}

        {props.orders.map((order) => {
          return (
            < Order
              ingrediants={order.ingrediants}
              price={order.price}
              key={order.id}
              deleteThisOrder={() => deleteOrderHandler(order.id)}
              orderData={order.orderData}/> 
          );
        })}
      </div>
    );
  }

  return (
    <div >
      {elem}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actionTypes.fetchOrders(token, userId)),
    onDeleteOrder: (orderID, token, userId) => dispatch(actionTypes.deleteOrder(orderID, token, userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandler(OrdersComponent, OrderxAxios));