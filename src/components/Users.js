import React from 'react';
import User from './User';

export default ({ users = [] }) => (
  <div className="users">
    {users.length > 0
      ? users.map(u => <User key={ u.id.toString() } user={ u } />)
      : 'No data about users'}
  </div>
);
