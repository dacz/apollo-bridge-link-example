import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'; // eslint-disable-line import/no-unresolved
import { createBridgeLink } from 'apollo-bridge-link';
import schema from './schemaPlain';
import { setContext } from 'apollo-link-context';

const mock = true;

const context = {
  graphQl: 'is cool',
};

const authLink = setContext(() => context);

const link = createBridgeLink({
  schema,
  resolvers: {},
  mock,
  context,
});

const cache = new InMemoryCache({ addTypename: true });

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  connectToDevTools: true,
  queryDeduplication: true,
});
