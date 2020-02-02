import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // const [inputStateRef, setStateRef] = useState({title: '', amount: ''});

  const [titleRef, setTitle] = useState('');
  const [amoutRef, setAmout] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: titleRef, amount: amoutRef});
    // ...
  };

  // onChangeHandler = (e, key) => {
  //   const {value} = e.target;
  //   setStateRef({...inputStateRef, [key]: value});
  // }

  return (

    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={titleRef} onChange={event => setTitle(event.target.value)} />
            {/* <input type="text" id="title" value={inputStateRef.title} 
              onChange={
                (event) => {
                  const {value} = event.target;
                  return setStateRef((prevState) => {
                    return {amount: prevState.amount, title: value};
                  })
                }
              }/> */}
          </div>

          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="text" id="title" value={amoutRef} onChange={event => setAmout(event.target.value)} />
            {/* <input type="number" id="amount" value={inputStateRef.amount}
              onChange={(event) => {
                const {value} = event.target;
                return setStateRef((prevState) => {
                  return {title: prevState.title, amount: value};
                })
              }}/> */}
          </div>

          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
