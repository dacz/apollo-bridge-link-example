import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../src/resolvers';
import typeDefs from '../src/schemaPlain';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// addMockFunctionsToSchema({ schema, preserveResolvers: true });

export default schema;
