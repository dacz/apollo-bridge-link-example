import { branch, compose, renderComponent, withProps } from 'recompose';
import { omit, prop } from 'ramda';

import React from 'react';
import { graphql } from 'react-apollo';

const Loading = () => <div> ... loading ...</div>;
const ErrorComponent = ({ error }) => (
  <div className="errormessage">{error.message}</div>
);

const withData = graphql(USERS, {
  options: () => ({
    variables: { id: '12345' },
  }),
});

const withData1 = graphql(USER, {
  options: ({ userId }) => ({
    variables: { id: userId },
  }),
  skip: ({ userId }) => !userId,
  props: ({ data: { loading, error, users } }) => ({
    loading,
    error,
    users,
  }),
});

const withLoading = branch(prop('loading'), renderComponent(Loading));

const withError = branch(prop('error'), renderComponent(Error));

const cleanUp = mapProps(omit(['loading', 'error', 'data']));

const withLog = withProps(console.log);

export default withLog;

// export default compose(withData, withLog);
