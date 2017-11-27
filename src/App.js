import { ApolloProvider } from 'react-apollo';
import React from 'react';
import Routes from './Routes';
import { client } from './apolloClient';

export default () => (
  <ApolloProvider client={ client }>
    <Routes />
  </ApolloProvider>
);
