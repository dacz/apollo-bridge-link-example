import gql from 'graphql-tag';

const USER_FRAGMENT = gql`
  fragment userFragment on User {
    id
    username
    email
  }
`;

const POST_FRAGMENT = gql`
  fragment postFragment on Post {
    id
    title
    content
  }
`;

export const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      ... userFragment
      posts {
        ... postFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${POST_FRAGMENT}
`;

export const USERS = gql`
  query users {
    users {
      ... userFragment
      posts {
        ... postFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${POST_FRAGMENT}
`;

export const POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      ... postFragment
      author {
        ... userFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${POST_FRAGMENT}
`;

export const POSTS = gql`
query posts {
  posts {
    ... postFragment
    author {
      ... userFragment
    }
  }
}
${USER_FRAGMENT}
${POST_FRAGMENT}
`;

// for now userId is submitted, then it will be infered from auth user
export const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!, $userId: ID!) {
    addPost(title: $title, content: $content, userId: $userId) {
      ...postFragment
      author {
        ...userFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${POST_FRAGMENT}
`;
