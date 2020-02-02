import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';


const Ingredients = () => {
  const [ingredientsRef, setIngredientsRef] = useState([]);

  const addIngredientHandler = (ing) => {
    setIngredientsRef((prevState) => {
      return [...prevState, {
        id: Math.random().toString(),
        ...ing,
      }];
    });
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />

        <IngredientList ingredients={ingredientsRef} onRemoveItem={() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
