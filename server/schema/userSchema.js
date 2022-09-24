export const User = `
type User {
  _id: ID!
  name: String!
  phone_no: String!
  status: String
  roles: [String]
  username: String!
  email: String!
  token: String
  thirdPirty: [thirdPirtyDetails]
  createdAt: String!
  updatedAt: String!
}`;
export const example = ``;
export const thirdPirtyDetails = ` type thirdPirtyDetails {
    via3rd: Boolean
    name: String
    token: String
    token_secret: String
    client_id: String
  }`;
export const InputThirdPirty = `
input InputThirdPirty {
  via3rd: Boolean
  name: String
  token: String
  token_secret: String
  client_id: String
}`;

export const InputUser = `
input InputUser {
  name: String!
  phone_no: String!
  email: String!
  username: String!
  password: String!
}`;
export const UserQueries = `
allUsers(key: String, value: String): [User]
getUser(key: String!, value: String!): User`;

export const UserMutations = `
createUser(user: InputUser): User
updateUser(id: ID!, update: InputUser): User
deleteUser(id: ID!): Boolean`;
