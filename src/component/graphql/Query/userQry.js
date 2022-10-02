import { gql } from '@apollo/client';
// export const CUSTOMER_QRY = gql`
//   query singleUser($id: Int!) {
//     getUser(id: $id) {
//       name
//       phone_no
//       status
//       roles
//       username
//       email
//       address
//       order_status
//       delivery_detail
//       engage
//       user
//       orders
//       thirdPirty {
//         via3rd
//         name
//         token
//         token_secret
//         client_id
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const ALL_USERS = gql`
  query allUsers($key: String, $value: String) {
    allUsers(key: $key, value: $value) {
      _id
      name
      phone_no
      status
      roles
      username
      email
      thirdPirty {
        via3rd
        name
        token
        token_secret
        client_id
      }
      createdAt
      updatedAt
    }
  }
`;
