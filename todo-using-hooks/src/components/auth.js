import React, { useContext } from 'react';

import authContext from '../contexts/app-context';

import '../App.css';

const Auth = (props) => {
  const auth = useContext(authContext);

  return (
    <React.Fragment>
      <div className="Login">
        <p>{auth.status ? <span>Logout</span> : <span>Login</span>}</p>

        <button onClick={auth.login}>
          Click To {auth.status ? <span>Logout</span> : <span>Login</span>}
        </button>
      </div>
    </React.Fragment>
  );
}

export default Auth;