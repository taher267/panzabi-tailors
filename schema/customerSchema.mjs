import { gql } from 'apollo-server-core';

export default gql`
  type Customer {
    _id: ID!
    name: String!
    phone_no: String!
    status: String
    email: String
    address: String
    order_status: String
    transportation: Transportation
    engage: [String]
    user: User
    orders: [CustomerOrder]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CustomerOrder {
    _id: String
    order_no: String
  }

  input InputCustomer {
    name: String!
    phone_no: String!
    status: String
    email: String
    address: String
    transportation: InputTransportation
    engage: [String]
  }

  type Transportation {
    transport_name: String
    receiver_address: String
    receiver_phone: String
  }

  input InputTransportation {
    transport_name: String
    receiver_address: String
    receiver_phone: String
  }

  type Query {
    allCustomers(key: String, value: String): [Customer]
    getCustomer(key: String, value: String): Customer
  }

  type Mutation {
    createCustomer(customer: InputCustomer!): Customer!
    updateCustomer(id: String!, update: InputCustomer): Customer
    deleteCustomer(id: ID!): Boolean
  }
`;
