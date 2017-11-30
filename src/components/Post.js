import { Link } from 'react-router-dom';
import React from 'react';
import User from './User';
import { postLink } from '../links';

export default ({ post }) => (
  <div className="post">
    <span className="title">
      <Link to={ postLink(post.id) }>{post.title}</Link>
    </span>
    <span className="id">{post.id}</span>
    <div className="content">{post.content}</div>
    {post.author ? (
      <div className="author">
        <User user={ post.author } />
      </div>
    ) : null}
  </div>
);
