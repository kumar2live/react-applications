import React, { useContext } from 'react';
import '../App.css';
import authContext from '../contexts/app-context';

const Header = (props) => {
  const auth = useContext(authContext);

  return (
    <React.Fragment>
      <div className="Header">
        {auth.status && <button onClick={props.onLoadTodos}>Todo List</button> }
        
        <button onClick={props.onLoadLogin}>Login</button>
      </div>
    </React.Fragment>
  );
}

export default Header;