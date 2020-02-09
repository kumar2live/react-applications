import React, { useState } from 'react';
import './App.css';

import TodoComponent from './components/todo';
import Header from './components/header';
import Auth from './components/auth';

import AuthContext from './contexts/app-context';

function App() {
  const [Page, setPage] = useState('Todo');
  const [AuthStatus, setAuthStatus] = useState(false);

  const switchPage = (pageName) => {
    setPage(pageName);
  }

  const login = () => {
    setAuthStatus(true);
  }

  return (
    <AuthContext.Provider value={{status: AuthStatus, login: login}}>
      <div className="App">
        <Header
          onLoadTodos={switchPage.bind(this, 'Todo')}
          onLoadLogin={switchPage.bind(this, 'Login')}/>
        
        {Page === 'Login' && <Auth />}
        {Page === 'Todo' && <TodoComponent />}

      </div>
    </AuthContext.Provider>
  );
}

export default App;
