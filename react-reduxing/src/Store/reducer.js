const initialState = {
  counter: 0,
  results: [],
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state, counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state, counter: state.counter - 1,
      };
    case 'ADD_FIVE':
      return {
        ...state, counter: state.counter + action.value,
      };
    case 'SUB_FIVE':
      return {
        ...state, counter: state.counter - action.value,
      };
    case 'STORE_RESULT':
      return {
        ...state,
        results: state.results.concat({id: (new Date()), value: state.counter}),
      }
    case 'DELETE_RESULT':
      // const id = 2;
      // const newArr = [...state.results]
      // newArr.splice(id, 1);

      // const updatedArr = state.results.filter((el) => )

      return {
        ...state,
        results: [],
      }
  }

  return state;
}

export default reducer;