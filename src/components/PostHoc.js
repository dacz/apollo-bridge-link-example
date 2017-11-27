import { branch, compose, renderComponent, withProps } from 'recompose';
import { pathOr, prop } from 'ramda';

import ErrorComponent from './Error';
import Loading from './Loading';
import { POST } from '../queries.graphql';
import Post from './Post';
import React from 'react';
import { graphql } from 'react-apollo';

const withPostId = withProps(props => ({
  postId: props.postId || pathOr(undefined, ['match', 'params', 'id'], props),
}));

const missingPostId = branch(
  props => !props.postId,
  renderComponent(<ErrorComponent error="Missing postId" />)
);

const withData = graphql(POST, {
  options: ({ postId }) => ({ variables: { id: postId } }),
  props: ({ data: { loading, error, post } }) => ({
    loading,
    error,
    post,
  }),
});

const withLoading = branch(prop('loading'), renderComponent(Loading));
const withError = branch(prop('error'), renderComponent(ErrorComponent));

export default compose(
  withPostId,
  missingPostId,
  withData,
  withLoading,
  withError
)(Post);
