import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { graphql, print } from 'graphql';

import { ApolloLink } from 'apollo-link';
import Observable from 'zen-observable';

export const createRestLink = (
  { schema, resolvers, mock, context = {} } = {}
) => {
  const executableSchema =
    typeof schema === 'string'
      ? makeExecutableSchema({ typeDefs: schema, resolvers })
      : resolvers
        ? makeExecutableSchema({ typeDefs: print(schema), resolvers })
        : schema;
  if (mock) addMockFunctionsToSchema({ schema, preserveResolvers: true });

  return new ApolloLink(
    operation =>
      new Observable(observer => {
        const { headers, credentials } = operation.getContext();
        const ctx = {
          ...context,
          headers,
          credentials,
        };

        graphql(
          executableSchema, // GraphQLSchema:,
          print(operation.query), // requestString:
          undefined, // rootValue:
          ctx, // contextValue:
          operation.variables, //variableValues:
          operation.operationName //operationName:
        )
          .then(data => {
            observer.next(data);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
      })
  );
};

export class RestLink extends ApolloLink {
  requester;

  constructor(opts) {
    super();
    this.requester = createRestLink(opts).request;
  }

  request(op) {
    return this.requester(op);
  }
}
