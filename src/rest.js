import DataLoader from 'dataloader';
import { REST_URL } from './links';
import fetch from 'isomorphic-fetch';
import qs from 'query-string';

// make fetch way better!!!

const postByAuthorLoader = new DataLoader(async userIds => {
  const data = await (await fetch(
    `${REST_URL}/posts/?${qs.stringify({ userId: userIds })}`
  )).json();
  return userIds.map(id => data.filter(item => item.userId === id));
});

const rest = {
  getPosts: async root =>
    root
      ? postByAuthorLoader.load(root.id)
      : await (await fetch(`${REST_URL}/posts`)).json(),

  getPost: async (root, args) =>
    root
      ? await (await fetch(`${REST_URL}/posts/${root.postId}`)).json()
      : await (await fetch(`${REST_URL}/posts/${args.id}`)).json(),

  addPost: async (root, args) =>
    await (await fetch(`${REST_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })).json(),

  getUsers: async () => await (await fetch(`${REST_URL}/users`)).json(),

  getUser: async (root, args) =>
    root
      ? await (await fetch(`${REST_URL}/users/${root.userId}`)).json()
      : await (await fetch(`${REST_URL}/users/${args.id}`)).json(),
};

export default rest;
