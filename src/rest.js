import DataLoader from 'dataloader';
import { REST_URL } from './links';
import fetcher from './fetcher';

const postByAuthorLoader = new DataLoader(async userIds => {
  const data = await fetcher.get({
    url: `${REST_URL}/posts/`,
    urlParams: { userId: userIds },
  });
  return userIds.map(id => data.filter(item => item.userId === id));
});

const usersLoader = new DataLoader(async userIds => {
  const data = await fetcher.get({
    url: `${REST_URL}/users/`,
    urlParams: { id: userIds },
  });
  return userIds.map(id => data.find(item => item.id === id));
});

const rest = {
  getPosts: async root =>
    root
      ? postByAuthorLoader.load(root.id)
      : await fetcher.get({ url: `${REST_URL}/posts` }),

  getPost: async (root, args) =>
    await fetcher.get({
      url: `${REST_URL}/posts/${root ? root.postId : args.id}`,
    }),

  addPost: async (root, args) =>
    await fetcher.post({ url: `${REST_URL}/posts`, data: args }),

  getUsers: async () => await fetcher.get({ url: `${REST_URL}/users` }),

  getUser: async (root, args) => usersLoader.load(root ? root.userId : args.id),
};

export default rest;
