import { compose, withProps } from 'recompose';

import { USERS } from '../queries.graphql';
import Users from './Users';
import { graphql } from 'react-apollo';
import loadingErrorCleanup from './loadingErrorCleanup';

const withData = graphql(USERS, {
  props: ({ data: { loading, error, users } }) => ({
    loading,
    error,
    users,
  }),
});

const withLog = withProps(console.log);

export default compose(
  withLog,
  withData,
  withLog,
  loadingErrorCleanup,
  withLog
)(Users);
