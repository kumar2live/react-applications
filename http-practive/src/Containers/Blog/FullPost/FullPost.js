import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  
  state = {
    loadedPost: null,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData () {
    if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params['postID'])) {
      const paramsID = this.props.match.params['postID'];
      if (paramsID) {
        axios.get('https://jsonplaceholder.typicode.com/posts/' + paramsID)
          .then((response) => {
            // console.log(response);
            this.setState({loadedPost: response.data});
          })
      }
    }
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params['postID'])
      .then((response) => {
        console.log(response);
      })
  }

  render () {
    // console.log(this.props);
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if (this.props.match.params['postID']) {
      post = <p style={{textAlign: 'center'}}>Loading..!</p>;
    }

    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>

          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>
      );
    }
    
    return post;
  }
}

export default FullPost;