import React from 'react';

import PropTypes from 'prop-types';

import CssClasses from './BurgerIngrediant.module.css';

const BurgerIngrediant = (props) => {

  let elem = null;

  switch(props.type) {
    case ('bread-bottom'):
      elem = (
        <div className={CssClasses.BreadBottom}>
        </div>
      );
      break;
    case ('bread-top'):
      elem = (
        <div className={CssClasses.BreadTop}>
          <div className={CssClasses.Seeds1}>
          </div>
          <div className={CssClasses.Seeds2}>
          </div>
        </div>
      );
      break;
    case ('meat'):
      elem = (
        <div className={CssClasses.Meat}>
        </div>
      );
      break;
    case ('cheese'):
      elem = (
        <div className={CssClasses.Cheese}>
        </div>
      );
      break;
    case ('bacon'):
      elem = (
        <div className={CssClasses.Bacon}>
        </div>
      );
      break;
    case ('salad'):
      elem = (
        <div className={CssClasses.Salad}>
        </div>
      );
      break;
    default:
      elem = null;
  }
  return (
    <div>
      {elem}
    </div>
  );

};

BurgerIngrediant.propTypes = {
  type: PropTypes.string.isRequired,
}

export default BurgerIngrediant;
