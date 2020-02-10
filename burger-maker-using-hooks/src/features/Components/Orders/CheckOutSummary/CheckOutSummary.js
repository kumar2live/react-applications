import React from 'react';

import CssStyles from './CheckOutSummary.module.css';

import BurgerComponent from '../../../Containers/Burger/BurgerComponent';
import ButtonsComponent from '../../../Components/UIElments/Buttons/Buttons';

const CheckOutSummary = (props) => {
  

  return (
    <React.Fragment>
      <div className={CssStyles.CheckOutSummary}>
        <h1>We hope it tastes well!</h1>

        <div style={{width: '100%', margin: 'auto'}}>
          <BurgerComponent ingrediants={props.ingrediants}/>
          
          <ButtonsComponent btnType='Danger' btnClicked={props.purchaseCancelled}>CANCEL</ButtonsComponent>
          <ButtonsComponent btnType='Success' btnClicked={props.purchaseContineued}>CONTINUE</ButtonsComponent>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckOutSummary;