import { gql } from '@apollo/client ';

export const ALL_CUSTOMERS = gql`
  query allCustomers {
    allCustomers {
      id
      name
      phone_no
      status
      email
      address
      order_status
      # delivery_detail {
      #   delivery_by
      #   delivery_charge
      #   delivery_address
      #   delivery_phone
      # }
      engage
      user
      orders
      createdAt
      updatedAt
    }
  }
`;
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
