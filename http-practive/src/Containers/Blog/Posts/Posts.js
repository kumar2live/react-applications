import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AxiosInstance from '../../../axios';

import Post from '../../../Components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    selectedPostID: null,
    errorPresent: false,
    loading: false,
  }

  componentDidMount() {
    console.log(this.props);

    this.setState({loading: true});
    AxiosInstance.get('/posts').then((response) => {
      // console.log(response);
      const postsRef = response.data.slice(4, 8);
      const updatedPosts = postsRef.map((postRef) => {
        return {...postRef, author: 'Muthu'};
      });
      this.setState({
        posts: updatedPosts,
        errorPresent: false,
        loading: true,
      });
    })
    .catch((error) => {
      this.setState({errorPresent: true, loading: false});
    })
  }

  postClickedhandler = (id) => {
    this.props.history.push('/' + id);
  }

  render() {

    let postsData = (<p style={{textAlign: "center"}}>Something went wrong !</p>);

    postsData = this.state.loading ? (<p style={{textAlign: "center"}}>Loading...!</p>) : null;

    if (!this.state.errorPresent) {
      postsData = this.state.posts.map((post) => {
        return (
          // <Link to={'/' + post.id} key={post.id}> 
            <Post postData={post} key={post.id} clicked={() => this.postClickedhandler(post.id)}/>
          // </Link>
          );
      });
    }

    return (
      <section className="Posts">
        {postsData}
      </section>
    );
  }


}

export default Posts;