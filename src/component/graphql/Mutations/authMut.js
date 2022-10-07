import { gql } from '@apollo/client';
export const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    userLogin(credentials: { username: $username, password: $password }) {
      token
    }
  }
`;
export const SIGNUP = gql`
  mutation userSignup($register: InputSignUp) {
    userSignup(register: $register) {
      token
    }
  }
`;

// import { gql } from 'graphql-tag';
// export const SIGNUP = gql`
//   mutation userSignup(
//     $name: String!
//     $username: String!
//     $email: String!
//     $phone_no: String!
//     $password: String!
//   ) {
//     userSignup(
//       register: {
//         name: $name
//         username: $username
//         email: $email
//         phone_no: $phone_no
//         password: $password
//       }
//     ) {
//       token
//     }
//   }
// `;
