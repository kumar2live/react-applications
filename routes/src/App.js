import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';

import ParantComponent from './Comps/Parent/Parent';

function App() {
  return (
    <BrowserRouter >
      <ParantComponent />
    </BrowserRouter>
  );
}

export default App;
