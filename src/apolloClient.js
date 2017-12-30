import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'; // eslint-disable-line import/no-unresolved
// import { createBridgeLink } from '../../apollo-bridge-link/lib';
import { createBridgeLink } from 'apollo-bridge-link';
import { dataLoadersFactory } from './rest';
import resolvers from './resolvers';
import schema from './schemaPlain';
import { setContext } from 'apollo-link-context';

const mock = true;

const context = {
  graphQl: 'is cool',
  headers: {
    'X-extend-me': 'should stay here',
  },
};

const authLink = setContext(() => context);

const link = createBridgeLink({
  schema,
  resolvers,
  mock,
  context,
  contextware: dataLoadersFactory,
});

const cache = new InMemoryCache({ addTypename: true });

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  connectToDevTools: true,
  queryDeduplication: true,
});

// not pure, but who is pure ;)
// because we need to leave referenced object in place
export const addTokenToMiddleware = token => {
  context.headers = { ...context.headers, authorization: `Bearer ${token}` };
  return true;
};

export const removeTokenFromMiddleware = () => {
  if (context.headers && context.headers.authorization) {
    delete context.headers.authorization;
    return true;
  }
  return false;
};

addTokenToMiddleware('superSecret');
