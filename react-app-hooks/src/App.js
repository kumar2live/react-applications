import React, { useContext } from 'react';

import Ingredients from './components/Ingrediants/Ingredients';
import Auth from './components/Auth';

import { AuthContext } from './contexts/auth-context';

const App = (props) => {
  const authContext = useContext(AuthContext);

  let content = (<Auth />);

  if (authContext.isAuth) {
    content = (<Ingredients />);
  }

  return content;
};

export default App;