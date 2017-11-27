import { branch, compose, renderComponent, withProps } from 'recompose';
import { pathOr, prop } from 'ramda';

import ErrorComponent from './Error';
import Loading from './Loading';
import React from 'react';
import { USER } from '../queries.graphql';
import User from './User';
import { graphql } from 'react-apollo';

const withUserId = withProps(props => ({
  userId: props.userId || pathOr(undefined, ['match', 'params', 'id'], props),
}));

const missingUserId = branch(
  props => !props.userId,
  renderComponent(<ErrorComponent error="Missing userId" />)
);

const withData = graphql(USER, {
  options: ({ userId }) => ({ variables: { id: userId } }),
  props: ({ data: { loading, error, user } }) => ({
    loading,
    error,
    user,
  }),
});

const withLoading = branch(prop('loading'), renderComponent(Loading));
const withError = branch(prop('error'), renderComponent(ErrorComponent));

export default compose(
  withUserId,
  missingUserId,
  withData,
  withLoading,
  withError
)(User);
