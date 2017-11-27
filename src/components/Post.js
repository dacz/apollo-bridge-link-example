import { Link } from 'react-router-dom';
import React from 'react';
import User from './User';
import { postLink } from '../links';

export default ({ post }) => (
  <div>
    <div className="post-header">
      <span className="id" style={{ color: 'grey', fontSize: '0.75em' }}>
        [post: {post.id}] :{' '}
      </span>
      <span className="title" style={{ fontWeight: 'bold' }}>
        <Link to={ postLink(post.id) }>title: {post.title}</Link>
      </span>
    </div>
    <div className="content" style={{ fontStyle: 'italic' }}>
      {post.content}
    </div>
    {post.author ? (
      <div className="author">
        Author:
        <User user={ post.author } />
      </div>
    ) : null}
  </div>
);
