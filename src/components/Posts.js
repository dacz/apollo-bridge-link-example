import Post from './Post';
import React from 'react';

export default ({ posts = [] }) => (
  <div>
    {posts.length > 0
      ? posts.map(p => <Post key={ p.id.toString() } post={ p } />)
      : 'No data about posts'}
  </div>
);
