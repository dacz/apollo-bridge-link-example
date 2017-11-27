import {
  compose,
  mapProps,
  withHandlers,
  withProps,
  withState,
} from 'recompose';

import { ADD_POST } from '../queries.graphql';
import PostNew from './PostNew';
import db from '../../db.json'; // eslint-disable-line import/no-unresolved
import { omit } from 'ramda';
import { withApollo } from 'react-apollo';

// mock
const withUserId = withProps({ userId: db.users[0].id });

const withLoading = withState('submitLoading', 'setSubmitLoading', false);
const withError = withState('submitError', 'setSubmitError', undefined);

const postHandlers = withHandlers({
  submitNewPost: props => async variables => {
    if (props.submitLoading) return true;

    props.setSubmitLoading(true);
    props.setSubmitError(undefined);

    try {
      const postResult = await props.client.mutate({
        mutation: ADD_POST,
        variables,
      });
      props.setSubmitLoading(false);
      props.history.push(`/posts/${postResult.data.addPost.id}`);
    } catch (err) {
      props.setSubmitLoading(false);
      props.setSubmitError(err.message);
    }
    return true;
  },
});

const cleanProps = mapProps(omit(['setSubmitLoading', 'setSubmitError']));

export default compose(
  withUserId,
  withLoading,
  withError,
  withApollo,
  postHandlers,
  cleanProps
)(PostNew);
