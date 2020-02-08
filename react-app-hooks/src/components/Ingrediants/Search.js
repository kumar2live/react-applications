import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onSearchIngredients} = props;
  const [filterTxt, setFilterTxt] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterTxt === inputRef.current.value) {
        const query = filterTxt.length === 0 ? '' : `?orderBy="title"&equalTo="${filterTxt}"`;
        fetch('https://mandesmuthukumar.firebaseio.com/ingredients.json' + query)
          .then((response) => response.json())
          .then((data) => {
            const loadedIngredients = [];
    
            for (const key in data) {
              loadedIngredients.push({id: key, title: data[key].title, amount: data[key].amount })
            }
            onSearchIngredients(loadedIngredients)
          });
      }
    }, 500);
     
    return () => {
      clearTimeout(timer);
    };
  }, [filterTxt, onSearchIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={inputRef} value={filterTxt} onChange={(event) => setFilterTxt(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
