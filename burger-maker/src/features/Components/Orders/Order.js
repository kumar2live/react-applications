import React from 'react';

import CssStyles from './Order.module.css';

const Order = (props) => {
  console.log(props);
  const ingrediantsRef = [];

  for (let ingre in props.ingrediants) {
    ingrediantsRef.push(
      {
        name: ingre,
        amount: props.ingrediants[ingre],
      }
    );
  }

  const ingreOutput = ingrediantsRef.map((ingreRef) => {
    return (
      <span style={{textTransform: 'capitalize', display: 'inline-block', padding: '3px', margin: '0 8px', border: '1px solid #ccc'}}
        key={ingreRef.name} > {ingreRef.name} : {ingreRef.amount}</span>
    );
  });

  return (
    <div className={CssStyles.Order}>
      <p>Ingrediants: {ingreOutput}</p>
      <p>Price: <strong>SGD {(+props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default Order;