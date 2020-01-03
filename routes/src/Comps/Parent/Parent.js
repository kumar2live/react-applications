import React, { Component } from 'react';
import { Route, NavLink, Redirect, Switch, Link} from 'react-router-dom';

import ChildrenComponentOne from '../Children/ChildrenOne'
import ChildrenComponentTwo from '../Children/ChildrenTwo'

import '../../App.css';

class ParantComponent extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="page-header">
          <div>
            <NavLink to="/childrenOne" exact>Children One</NavLink>
          </div>
          <div>
            <NavLink to="/childrenTwo" exact>Children Two</NavLink>
          </div>
        </div>

        <p >I am Paragraph from Parent Component</p>
        
        <Switch>
          <Route path="/childrenOne" component={ChildrenComponentOne}/>
          <Route path="/childrenTwo" component={ChildrenComponentTwo}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default ParantComponent;