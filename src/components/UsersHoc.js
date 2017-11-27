import { USERS } from '../queries.graphql';
import Users from './Users';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import loadingErrorCleanup from './loadingErrorCleanup';

const withData = graphql(USERS, {
  props: ({ data: { loading, error, users } }) => ({
    loading,
    error,
    users,
  }),
});

export default compose(withData, loadingErrorCleanup)(Users);
