import { gql } from 'graphql-tag';
export const SIGNUP = gql`
  mutation userSignup(
    $name: String!
    $username: String!
    $email: String!
    $phone_no: String!
    $password: String!
  ) {
    userSignup(
      register: {
        name: $name
        username: $username
        email: $email
        phone_no: $phone_no
        password: $password
      }
    ) {
      token
    }
  }
`;
