import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

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

const fetchReducer = (currentFetchState, action) => {
  switch(action.type) {
    case 'SEND':
      return {isLoading: true, errorState: null };
    case 'RESPONSE':
      return {...currentFetchState, isLoading: false};
    case 'ERROR':
      return {isLoading: false, errorState: action.errorData };
    case 'CLEAR':
      return {...currentFetchState, errorState: null};
    default:
      throw new Error('Should not come till here!');
  }
}

const Ingredients = () => {
  const [ingredientsRef, ingredientDispatch] = useReducer(ingredientsReducer, []);
  // const [ingredientsRef, setIngredientsRef] = useState([]);
  
  const [fetchState, fetchDispatcher] = useReducer(fetchReducer, {isLoading: false, errorState: null});
  // const [isLoading, setisLoading] = useState(false);
  // const [errorState, seterrorState] = useState('')

  useEffect(() => {
    console.log('Rendering Ingredients');
  }, [ingredientsRef]);

  // useEffect(() => {  
  //   fetch('https://mandesmuthukumar.firebaseio.com/ingredients.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const loadedIngredients = [];
  //       console.log('data -- ', data);
  //       for (const key in data) {
  //         loadedIngredients.push({id: key, title: data[key].title, amount: data[key].amount })
  //       }

  //       setIngredientsRef(loadedIngredients);
  //     });
  // }, []);

  const addIngredientHandler = (ing) => {
    // setisLoading(true);
    fetchDispatcher({type: 'SEND'});
    fetch('https://mandesmuthukumar.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ing),
        headers: { 'Content-Type': 'application/json'}
      }).then((response) => response.json()).then((data) => {
        // setisLoading(false);
        fetchDispatcher({type: 'RESPONSE'});

        // setIngredientsRef((prevState) => {
        //   return [...prevState, {
        //     id: data.name,
        //     ...ing,
        //   }];
        // });

        ingredientDispatch({type: 'ADD', ingredient: {id: data.name, ...ing} });
      })
  }

  const removeIngredientHandler = (ingID) => {
    // setisLoading(true);
    fetchDispatcher({type: 'SEND'});
    fetch(
      'https://mandesmuthukumar.firebaseio.com/ingredients/' + ingID +'.json',
      {
        method: 'DELETE'
      })
      .then((response) => response.json())
      .then((_data) => {
        // setisLoading(false);
        fetchDispatcher({type: 'RESPONSE'});

        // setIngredientsRef((prevState) => {
        //   return prevState.filter((ingRef) => ingRef.id !== ingID)
        // })

        ingredientDispatch({type: 'DELETE', id: ingID });
      })
      .catch((error) => {
        fetchDispatcher({type: 'ERROR', errorData: 'Something went wrong'});
        // setisLoading(false);
        // seterrorState('Something went wrong');
      });
  }

  const onSearchIngredientsHandler = useCallback(
    (filterIngredient) => {
      // setIngredientsRef(filterIngredient);
      ingredientDispatch({type: 'SET', ingredients: filterIngredient });
    },[]);

  // const onSearchIngredientsHandler = (filterIngredient) => {
  //   console.log(filterIngredient);
  //   setIngredientsRef(filterIngredient);
  // }

  const clearError = () => {
    fetchDispatcher({type: 'CLEAR'});
    // seterrorState('');
  }

  return (
    <div className="App">
      {fetchState.errorState && <ErrorModal onClose={clearError}>{fetchState.errorState}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} isLoading={fetchState.isLoading}/>

      <section>
        <Search onSearchIngredients={onSearchIngredientsHandler}/>

        <IngredientList ingredients={ingredientsRef} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
