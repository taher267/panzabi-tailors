import { gql } from 'apollo-server-core';

export default gql`
  type User {
    _id: ID!
    name: String!
    phone_no: String!
    status: String
    roles: [String]
    username: String
    email: String
    token: String
    thirdPirty: [thirdPirtyDetails]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type thirdPirtyDetails {
    via3rd: Boolean
    name: String
    token: String
    token_secret: String
    client_id: String
  }

  input InputThirdPirty {
    via3rd: Boolean
    name: String
    token: String
    token_secret: String
    client_id: String
  }
  input InputUser {
    name: String!
    phone_no: String!
    email: String!
    username: String!
    password: String!
  }
  type Query {
    allUsers(key: String, value: String): [User]
    getUser(key: String!, value: String!): User
  }

  type Mutation {
    createUser(user: InputUser): User
    updateUser(id: ID!, update: InputUser): User
    deleteUser(id: ID!): Boolean
  }
`;
