import React from 'react';

// import BurgerComponent from '../../Containers/Burger/BurgerComponent';

import CssStyles from './Order.module.css';

const Order = (props) => {
  // console.log(props);
  const ingrediantsRef = [];
  const orderData = [];

  for (let ingre in props.ingrediants) {
    ingrediantsRef.push(
      {
        name: ingre,
        amount: props.ingrediants[ingre],
      }
    );
  }

  for (let odata in props.orderData) {
    orderData.push({name: odata, value: props.orderData[odata]});
  }

  const ingreOutput = ingrediantsRef.map((ingreRef) => {
    return (
      <span 
        style={{textTransform: 'capitalize', display: 'inline-block', padding: '3px', margin: '0 8px', border: '1px solid #ccc'}}
        key={ingreRef.name} >
          {ingreRef.name} : {ingreRef.amount}
      </span>
    );
  });
  const orderOutput = orderData.map((orderd) => {
    return (
      <div 
        style={{textTransform: 'capitalize'}}
        key={orderd.name}>
        {orderd.name} : {orderd.value || '-NA'}
      </div>
    );
  });

  return (
    <div className={CssStyles.Order}>
      <p>Ingrediants: {ingreOutput}</p>
      
      <div><strong>Details:</strong> {orderOutput}</div>

      {/* <div className={CssStyles.OrderDetails}>
        <div>
          <div><strong>Details:</strong> {orderOutput}</div>
        </div>

        <div>
          <BurgerComponent ingrediants={props.ingrediants}/>
        </div>
      </div> */}

      <p>Price: <strong>SGD {(+props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default Order;