import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

import useCustomHttp from '../../custom-hooks/httpHook';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
  const {onSearchIngredients} = props;
  const [filterTxt, setFilterTxt] = useState('');
  const inputRef = useRef();
  const {isLoading, data, errorState, sendRequest, clearState } = useCustomHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterTxt === inputRef.current.value) {
        const query = filterTxt.length === 0 ? '' : `?orderBy="title"&equalTo="${filterTxt}"`;
        const url = 'https://mandesmuthukumar.firebaseio.com/ingredients.json' + query;
        sendRequest( url, 'GET', null, null, null );
      }
    }, 500);
     
    return () => {
      clearTimeout(timer);
    };
  }, [filterTxt, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !errorState && data) {
      const loadedIngredients = [];
    
      for (const key in data) {
        loadedIngredients.push({id: key, title: data[key].title, amount: data[key].amount })
      }
      onSearchIngredients(loadedIngredients)
    }
  }, [data, isLoading, errorState, onSearchIngredients]);

  return (
    <section className="search">
      {errorState && <ErrorModal onClose={clearState}>{errorState}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...!</span>}
          <input type="text" ref={inputRef} value={filterTxt} onChange={(event) => setFilterTxt(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
