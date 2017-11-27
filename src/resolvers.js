import rest from './rest';

export default {
  Query: {
    post: (...args) => rest.getPost(...args),
    posts: (...args) => rest.getPosts(...args),
    user: (...args) => rest.getUser(...args),
    users: (...args) => rest.getUsers(...args),
  },

  Mutation: {
    addPost: (...args) => rest.addPost(...args),
  },

  Post: {
    author: (...args) => rest.getUser(...args),
  },

  User: {
    posts: (...args) => rest.getPosts(...args),
  },
};
