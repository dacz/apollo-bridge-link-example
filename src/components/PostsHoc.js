import { compose, withProps } from 'recompose';

import { POSTS } from '../queries.graphql';
import Posts from './Posts';
import { graphql } from 'react-apollo';
import loadingErrorCleanup from './loadingErrorCleanup';

const withData = graphql(POSTS, {
  props: ({ data: { loading, error, posts } }) => ({
    loading,
    error,
    posts,
  }),
});

const withLog = withProps(console.log);

export default compose(withData, loadingErrorCleanup, withLog)(Posts);
