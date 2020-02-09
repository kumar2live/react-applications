import { useCallback, useReducer } from 'react';

const initialState = {
  isLoading: false,
  errorState: null,
  data: null,
  extra: null,
  identifier: null,
}

const fetchReducer = (currState, action) => {
  switch(action.type) {
    case 'SEND':
      return {
        isLoading: true,
        errorState: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...currState,
        isLoading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return {isLoading: false, errorState: action.errorData };
    case 'CLEAR_ERROR':
      return {...currState, errorState: null};
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not come till here!');
  }
}

const useCustomHttp = () => {
  const [fetchState, fetchDispatcher] = useReducer(fetchReducer, initialState);

    const clearState = useCallback(
      () => fetchDispatcher({type: 'CLEAR'}), []);

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
      fetchDispatcher({type: 'SEND', identifier: reqIdentifier});
      fetch(
        url,
        {
          method: method, body: body,
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((_data) => {
          fetchDispatcher({type: 'RESPONSE', responseData: _data, extra: reqExtra});
        })
        .catch((error) => {
          fetchDispatcher({type: 'ERROR', errorData: 'Something went wrong'});
        });
    }, [])

    return {
      isLoading: fetchState.isLoading,
      data: fetchState.data,
      errorState: fetchState.errorState,
      sendRequest: sendRequest,
      reqExtra: fetchState.extra,
      reqIdentifier: fetchState.identifier,
      clearState: clearState,
    };
};

export default useCustomHttp;