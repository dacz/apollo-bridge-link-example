import DataLoader from 'dataloader';
import { REST_URL } from './links';
import fetcher from './fetcher';

// ---- DATA LOADERS

export const dataLoadersFactory = ctx => ({
  dataLoaders: {
    postByAuthor: new DataLoader(async userIds => {
      const data = await fetcher.get({
        url: `${REST_URL}/posts/`,
        urlParams: { userId: userIds },
        ctx,
      });
      return userIds.map(id => data.filter(item => item.userId === id));
    }),

    users: new DataLoader(async userIds => {
      const data = await fetcher.get({
        url: `${REST_URL}/users/`,
        urlParams: { id: userIds },
        ctx,
      });
      return userIds.map(id => data.find(item => item.id === id));
    }),
  },
});

// ---- FETCHER'S METHODS

const rest = {
  getPosts: async (root, args, ctx) =>
    root
      ? ctx.dataLoaders.postByAuthor.load(root.id)
      : await fetcher.get({
        url: `${REST_URL}/posts`,
        ctx,
      }),

  getPost: async (root, args, ctx) =>
    await fetcher.get({
      url: `${REST_URL}/posts/${root ? root.postId : args.id}`,
      ctx,
    }),

  addPost: async (root, args, ctx) =>
    await fetcher.post({ url: `${REST_URL}/posts`, data: args, ctx }),

  getUsers: async (root, args, ctx) =>
    await fetcher.get({
      url: `${REST_URL}/users`,
      ctx,
    }),

  getUser: async (root, args, ctx) =>
    ctx.dataLoaders.users.load(root ? root.userId : args.id),
};

export default rest;
