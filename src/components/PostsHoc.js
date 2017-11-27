import { POSTS } from '../queries.graphql';
import Posts from './Posts';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import loadingErrorCleanup from './loadingErrorCleanup';

const withData = graphql(POSTS, {
  props: ({ data: { loading, error, posts } }) => ({
    loading,
    error,
    posts,
  }),
});

export default compose(withData, loadingErrorCleanup)(Posts);
