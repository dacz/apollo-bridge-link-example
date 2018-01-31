import rest from './rest';

export default {
  Query: {
    post: rest.getPost,
    posts: rest.getPosts,
    user: rest.getUser,
    users: rest.getUsers,
  },

  Mutation: {
    addPost: rest.addPost,
  },

  Post: {
    author: rest.getUser,
  },

  User: {
    posts: rest.getPosts,
  },
};
