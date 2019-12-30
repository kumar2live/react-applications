import React from 'react';
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant';

import BurgerComponentCss from './BurgerComponent.module.css';

const BurgerComponent = (props) => {
  let ingrediants =
    Object.keys(props.ingrediants).map((ingKey) => {
      return [...Array(props.ingrediants[ingKey])].map((_, index) => {
        return (
          <BurgerIngrediant key={ingKey + index} type={ingKey}/>
        );
      });
    }).reduce((prev, current) => {
      return prev.concat(current);
    }, []);

  if (ingrediants.length === 0) {
    ingrediants = <p>Please start adding ingrediants</p>
  }

  return (
    <div className={BurgerComponentCss.Burger}>
      <BurgerIngrediant type="bread-top"/>
      {ingrediants}
      <BurgerIngrediant type="bread-bottom"/>
    </div>
  );
};

export default BurgerComponent;