import { gql } from 'apollo-server';
export default gql`
  type DailyAccount {
    _id: ID!
    name: String!
    date: Date!
    purpose: String!
    type: String!
    cash_in: Float
    cash_out: Float
    comment: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input InputDailyAccount {
    name: String!
    date: Date!
    purpose: String!
    type: String!
    cash_in: Float
    cash_out: Float
    comment: String
  }

  # Query
  type Query {
    allAccounts(key: String, value: String): [DailyAccount!]!

    getDailyAccount(key: String!, value: String!): DailyAccount!
  }

  # Mutation
  type Mutation {
    createDailyAccount(account: InputDailyAccount): DailyAccount

    updateDailyAccount(_id: ID!, update: InputDailyAccount): DailyAccount

    deleteDailyAccount(_id: ID!): Boolean
  }
`;
