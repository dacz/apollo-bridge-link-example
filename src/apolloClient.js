import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'; // eslint-disable-line import/no-unresolved
import { createBridgeLink } from 'apollo-bridge-link';
import resolvers from './resolvers';
import schema from './schemaPlain';

const mock = true;

const context = {
  graphQl: 'is cool',
};

const link = createBridgeLink({ schema, resolvers, mock, context });

const cache = new InMemoryCache({ addTypename: true });

export const client = new ApolloClient({
  link,
  cache,
});
