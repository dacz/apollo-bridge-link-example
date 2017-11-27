import { Link } from 'react-router-dom';
import Posts from './Posts';
import React from 'react';
import { userLink } from '../links';

export default ({ user }) => (
  <div>
    <div className="post-header">
      <span className="id" style={{ color: 'grey', fontSize: '0.75em' }}>
        [user: {user.id}] :{' '}
      </span>
      <span className="title" style={{ fontWeight: 'bold' }}>
        <Link to={ userLink(user.id) }>{user.username}</Link>
      </span>
      <span
        className="email"
        style={{ color: 'grey', fontSize: '0.75em', fontStyle: 'italic' }}
      >
        {' '}
        ({user.email})
      </span>
    </div>
    {user.posts ? (
      <div className="posts">
        Posts:
        <Posts posts={ user.posts } />
      </div>
    ) : null}
  </div>
);
