import React, { Component } from 'react';
import OrderxAxios from '../../../axios-orders';

import SpinnerComponent from '../../Components/UIElments/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Order from '../../Components/Orders/Order';
import './Orders.css';

class OrdersComponent extends Component {
  state = {
    loading: true,
    orders: [],
    errorRef: false,
  }

  componentDidMount() {
    OrderxAxios.get('/orders.json').then((response) => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }

      this.setState({
        orders: fetchedOrders,
        loading: false,
      })
    }).catch((error) => {
      this.setState({
        errorRef: true, loading: false,
      });
    });
  }

  render () {
    let elem = null;

    if (this.state.loading) {
      elem = (<SpinnerComponent />);
    } else {
      elem = (

        <div className="Orders">
          {this.state.orders.map((order) => {
            return (
              < Order ingrediants={order.ingrediants} price={order.price} key={order.id} orderData={order.orderData}/> 
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

export default WithErrorHandler(OrdersComponent, OrderxAxios);