import { addTokenToMiddleware, dynamicContext } from './context';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createBridgeLink } from 'apollo-bridge-link';
import resolvers from './resolvers';
import schema from './schemaPlain';
import { setContext } from 'apollo-link-context';

const mock = true;

const contextLink = setContext((_req, prevContext) =>
  dynamicContext(prevContext)
);

const link = createBridgeLink({
  schema,
  resolvers,
  mock,
});

const cache = new InMemoryCache({ addTypename: true });

export const client = new ApolloClient({
  link: contextLink.concat(link),
  cache,
  connectToDevTools: true,
  queryDeduplication: true,
});

addTokenToMiddleware('superSecret');
