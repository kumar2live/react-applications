import React, { Component } from 'react';

// import Post from '../../Components/Post/Post';
import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import './Blog.css';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

// import AxiosInstance from '../../axios';
import Posts from './Posts/Posts';

class Blog extends Component {
  render () {

    return (
      <div className="Blog">
        <div className="HeaderBlog">
          <div>
            <NavLink to="/" exact activeStyle={{fontWeight: 'bold', textDecoration: 'underline'}}>Home</NavLink>
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
          {/* <div><a href="/">Home</a></div>
          <div><a href="/new-post">New Post</a></div> */}
        </div>

        <div className="SectionBlog">
          <Switch>
            <Route path="/" exact component={Posts} />
            {/* <Route path="/new-post" render={() => <NewPost /> }/> */}
            <Route path="/new-post" exact component={NewPost}/>
            <Route path="/:postID" exact component={FullPost}/>
          </Switch>
          
          {/* <section className="Posts">
            {postsData}
          </section> */}
          {/* <section>
            <FullPost id={this.state.selectedPostID}/>
          </section>
          <section>
            <NewPost />
          </section> */}
        </div>
      </div>
    );
  }
}

export default Blog;