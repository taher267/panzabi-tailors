import { gql } from '@apollo/client';
export const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    userLogin(credentials: { username: $username, password: $password }) {
      token
    }
  }
`;

// mutation userLogin(username){

// userLogin(credentials:{
//     username:$username
// }){
//     token
// }
// }
