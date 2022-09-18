import { gql } from '@apollo/client';

export const NEW_CUSTOMER_QRY = gql`
  mutation createUser($name: String!, $phone_no: String!) {
    createUser(user: { name: $name, phone_no: $phone_no }) {
      name
    }
  }
`;

// mutation newUser(

//   createUser(
//     user: {
//       # name: $name
//       phone_no: $phone_no
//       email: $email
//       address: $address
//       engage: $engage
//     }
//   ) {
//     name

//   }
/**
 * phone_no
      status
      roles
      username
      email
      address
      order_status
      delivery_detail {
        delivery_by
        delivery_charge
        delivery_address
        delivery_phone
      }
      engage
      user
      orders
      thirdPirty {
        via3rd
        name
        token
        token_secret
        client_id
      }
      createdAt
      updatedAt
 */
/**
 *   # input DeliveryDetails {
  #     $delivery_by: String
  #     $delivery_charge: Float
  #     $delivery_address: String
  #     $delivery_phone: String
  # }
 */
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

// export const CUSTOMERS_QRY = gql`
//   {
//     allUsers {
//       name
//       phone_no
//       status
//       roles
//       username
//       email
//       address
//       order_status
//       delivery_detail {
//         delivery_by
//         delivery_charge
//         delivery_address
//         delivery_phone
//       }
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
// 63134fc4362a560e956dfc22
