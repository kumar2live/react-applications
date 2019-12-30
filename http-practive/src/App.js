import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';

import Blog from './Containers/Blog/Blog';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Blog />
      </div>
    </BrowserRouter>
  );
}

export default App;
