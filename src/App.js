import { ApolloProvider } from 'react-apollo';
import React from 'react';
import Routes from './Routes';
import { client } from './apolloClientHttp';
// import { client } from './apolloClientBridge';

export default () => (
  <ApolloProvider client={ client }>
    <Routes />
  </ApolloProvider>
);
