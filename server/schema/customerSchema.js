export const Customer = `
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
  orders: [String]
  createdAt: String!
  updatedAt: String!
}`;
export const InputCustomer = `
input InputCustomer {
  name: String!
  phone_no: String!
  status: String
  email: String
  address: String
  transportation: InputTransportation
  engage: [String]
  orders: [String]
}`;
export const Transportation = `type Transportation {
  transport_name: String
  receiver_address: String
  receiver_phone: String
}`;
export const example = ``;
export const InputTransportation = `
input InputTransportation {
  transport_name: String
  receiver_address: String
  receiver_phone: String
}`;

export const CustomerQueries = `
  allCustomers(key: String, value: String): [Customer]
  getCustomer(key: String, value: String): Customer`;

export const CustomerMutations = ` createCustomer(customer: InputCustomer): Customer
  updateCustomer(id: String!, update: InputCustomer): Customer
  deleteCustomer(id: ID!): Boolean`;
