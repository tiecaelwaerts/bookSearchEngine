import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    email: String!
    username: String!
    password: String!
  }

  input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

export default typeDefs;