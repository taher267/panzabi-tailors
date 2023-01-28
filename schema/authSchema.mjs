import { gql } from 'apollo-server';

export default gql`
  type Login {
    token: String!
  }
  input InputSignUp {
    name: String!
    phone_no: String!
    email: String!
    username: String!
    password: String!
  }
  input InputLogin {
    username: String!
    password: String!
  }
  type Mutation {
    userLogin(credentials: InputLogin): Login!
    userSignup(register: InputSignUp): Login!
  }
`;
// @constraint(minLength: 25)
