import { gql } from 'apollo-server-core';
const CustomerCommon = `
  _id: ID!
  name: String!
  phone_no: String!
  status: String
  email: String
  address: String
  order_status: String
  transportation: Transportation
  engage: [String]
  orders: [CustomerOrder]
  createdAt: DateTime!
  updatedAt: DateTime!
`;
export default gql`
  type Customer {
 ${CustomerCommon}
    user: User
  }
  type newCustomer {
    ${CustomerCommon}
    user: String!
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
    deleteCustomer(_id: ID!): Boolean
  }
`;
