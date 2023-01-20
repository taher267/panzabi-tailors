import { gql } from 'apollo-server-core';

export default gql`
  type Measurement {
    _id: ID!
    label: String!
    name: String!
    type: String
    sl_id: String!
    template: String!
    status: String!
    options: String
    params: String
    validation: String
    placeholder: String
    icon: Icon
  }

  input InputMeasurement {
    label: String!
    name: String!
    sl_id: String!
    type: String
    template: String!
    status: String!
    validation: String
    placeholder: String
    options: String
    params: String
    icon: InpIcon
  }

  type Query {
    allMeasurements(
      key: String
      value: String
      options: String
    ): [Measurement!]!
    getMeasurement(key: String!, value: String!): Measurement!
  }
  type Mutation {
    createMeasurement(measures: InputMeasurement!): Measurement!
    updateMeasurement(id: String!, update: InputMeasurement): Measurement
    deleteMeasurement(id: ID!): Boolean
  }
`;
