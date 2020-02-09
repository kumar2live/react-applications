import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import useCustomHttp from '../../custom-hooks/httpHook';

const ingredientsReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not come till here!');
  }
}

const Ingredients = () => {
  const [ingredientsRef, ingredientDispatch] = useReducer(ingredientsReducer, []);
  const {isLoading, data, errorState, sendRequest, reqExtra, reqIdentifier, clearState } = useCustomHttp();

  useEffect(() => {
    if (!isLoading && !errorState && reqIdentifier === 'REMOVE_INGREDIENT') {
      ingredientDispatch({type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !errorState && reqIdentifier === 'ADD_INGREDIENT') {
      ingredientDispatch({type: 'ADD', ingredient: {id: data.name, ...reqExtra} });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, errorState]);

  const addIngredientHandler = useCallback((ing) => {
    sendRequest(
      'https://mandesmuthukumar.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ing),
      ing,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback((ingID) => {
    sendRequest(
      'https://mandesmuthukumar.firebaseio.com/ingredients/' + ingID +'.json',
      'DELETE',
      null,
      ingID,
      'REMOVE_INGREDIENT'
    );
  }, [sendRequest]);

  const onSearchIngredientsHandler = useCallback(
    (filterIngredient) => {
      ingredientDispatch({type: 'SET', ingredients: filterIngredient });
    },[]);

  const memorizeIngredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ingredientsRef} onRemoveItem={removeIngredientHandler}/>
    );
  }, [ingredientsRef, removeIngredientHandler])

  return (
    <div className="App">
      {errorState && <ErrorModal onClose={clearState}>{errorState}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading}/>

      <section>
        <Search onSearchIngredients={onSearchIngredientsHandler}/>

        {memorizeIngredientList}
      </section>
    </div>
  );
}

export default Ingredients;
