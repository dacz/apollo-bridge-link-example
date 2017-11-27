export default `
  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }

  type User {
    id: ID!
    username: String
    email: String
    posts: [Post]
  }

  type Query {
    posts: [Post]
    post (id: ID!): Post
    users: [User]
    user (id: ID!): User
  }
  type Mutation {
    addPost(title: String!, content: String!, userId: ID!): Post!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
