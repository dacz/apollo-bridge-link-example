import { Link } from 'react-router-dom';
import Posts from './Posts';
import React from 'react';
import { userLink } from '../links';

export default ({ user }) => (
  <div className="user">
    <span className="username">
      <Link to={ userLink(user.id) }>{user.username}</Link>
    </span>
    <span className="id">{user.id}</span>
    <span className="email">{user.email}</span>
    {user.posts ? (
      <div className="user-posts">
        <Posts posts={ user.posts } />
      </div>
    ) : null}
  </div>
);
