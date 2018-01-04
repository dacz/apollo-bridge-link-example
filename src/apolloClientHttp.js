import { addTokenToMiddleware, dynamicContext } from './contextForHttpLink';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from '../graphQLServer/config';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const context = {
  graphQl: 'is cool',
  headers: {
    'X-extend-me': 'should stay here',
  },
};

// we need it for autorization (adding/removing token)
const contextLink = setContext(_ => dynamicContext(context));

const link = createHttpLink({
  uri: `http://localhost:${config.GRAPHQL_SERVER_PORT}${
    config.GRAPHQL_API_PATH
  }`,
  credentials: 'include',
  // credentials: 'same-origin',
});

const cache = new InMemoryCache({ addTypename: true });

export const client = new ApolloClient({
  link: contextLink.concat(link),
  cache,
  connectToDevTools: true,
  queryDeduplication: true,
});

addTokenToMiddleware('superSecret');
