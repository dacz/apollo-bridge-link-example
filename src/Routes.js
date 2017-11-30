import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';
import PostHoc from './components/PostHoc';
import PostNewHoc from './components/PostNewHoc';
import PostsHoc from './components/PostsHoc';
import React from 'react';
import UserHoc from './components/UserHoc';
import UsersHoc from './components/UsersHoc';

export default () => (
  <Router>
    <div>
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/createPost">Create New Post</Link>
        </li>
      </ul>

      <hr />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/users/:id" component={ UserHoc } />
        <Route exact path="/users" component={ UsersHoc } />
        <Route path="/posts/:id" component={ PostHoc } />
        <Route exact path="/posts" component={ PostsHoc } />
        <Route exact path="/createPost" component={ PostNewHoc } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  </Router>
);
