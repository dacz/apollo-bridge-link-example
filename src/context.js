import { mergeDeepRight, pick } from 'ramda';

import { dataLoadersFactory } from './rest';

// this context is used with Bridge or on the server

// when using graphQL server for developing,
// this specifies which headers from graphQL request
// will be copied to context for resolvers
export const copyOnlyHeaders = pick(['authorization', 'x-extend-me']);

export const context = {
  graphQl: 'is cool',
  headers: {
    'x-extend-me': 'should stay here',
  },
};

// this creates the context on each request
// here for authorization (modifying context headers) and dataloaders
// or see https://www.apollographql.com/docs/react/recipes/authentication.html
// if using local storage
export const dynamicContext = prevContext => {
  const mergedContext = mergeDeepRight(context, prevContext);
  return {
    ...mergedContext,
    ...dataLoadersFactory(mergeDeepRight(context, prevContext)),
  };
};

// --- context manipulation. Eg. for auth token
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
