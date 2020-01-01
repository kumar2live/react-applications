import React, { Component, Suspense } from 'react';

// import NewPost from './NewPost/NewPost';
import './Blog.css';
import { Route, Redirect, Link, NavLink, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';

// import asyncComponent from '../../hoc/asyncComponent';
// const AsyncNewPost = asyncComponent(() => {
//   return import('./NewPost/NewPost');
// })

const NewPostLazy = React.lazy(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true,
  };

  render () {

    return (
      <div className="Blog">
        <div className="HeaderBlog">
          <div>
            <NavLink to="/posts/" exact activeStyle={{fontWeight: 'bold', textDecoration: 'underline'}}>Home</NavLink>
            {/* Can set to custom classes when first/any link is active */}
            {/* <NavLink to="/" exact activeClassName="my-active">Home</NavLink> */}
          </div>
          <div>
            <NavLink to={{
                pathname: '/new-post',
                hash: '#submit',
                search: '?quick-submit=true'
              }}>New Post
            </NavLink>
            {/* <NavLink to="/new-post?quick-submit=true#submit">New Post</NavLink> */}
          </div>
        </div>

        <div className="SectionBlog">
          <Switch>
            {/* {this.state.auth ? <Route path="/new-post" exact component={NewPost}/> : null}; */}
            {this.state.auth ? <Route path="/new-post" exact render={() => <Suspense fallback={<div>Loading...</div>}><NewPostLazy/></Suspense>}/> : null};
            
            {/* {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost}/> : null}; */}
            <Route path="/posts" component={Posts} />
            <Redirect from="/" to="/posts"></Redirect>

            {/* redirectTo */}
            {/* <Route path="/" component={Posts} /> */}
            {/* <Route path="/new-post" render={() => <NewPost /> }/> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Blog;