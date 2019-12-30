import React from 'react';
// import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
  // console.log('props on post -- ', props);

  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.postData.title}</h1>
      <div className="Info">
        <div className="Author">{props.postData.author}</div>
      </div>
    </article>
  )
};

export default post;
// export default withRouter(post);