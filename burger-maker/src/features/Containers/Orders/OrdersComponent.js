import React, { Component } from 'react';
import OrderxAxios from '../../../axios-orders';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';

import SpinnerComponent from '../../Components/UIElments/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Order from '../../Components/Orders/Order';
import './Orders.css';

class OrdersComponent extends Component {
  componentDidMount() {
    if (this.props.token && this.props.userId) {
      this.props.onFetchOrders(this.props.token, this.props.userId);
    }
  }

  deleteOrderHandler(orderID) {
    this.props.onDeleteOrder(orderID, this.props.token);
  }

  render () {
    let elem = null;

    if (this.props.loading) {
      elem = (<SpinnerComponent />);
    } else {
      elem = (

        <div className="Orders">
          {this.props.orders.map((order) => {
            return (
              < Order
                ingrediants={order.ingrediants}
                price={order.price}
                key={order.id}
                deleteThisOrder={() => this.deleteOrderHandler(order.id)}
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
    onDeleteOrder: (orderID, token) => dispatch(actionTypes.deleteOrder(orderID, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandler(OrdersComponent, OrderxAxios));