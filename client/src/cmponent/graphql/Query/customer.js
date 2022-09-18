import { gql } from '@apollo/client';

export const NEW_CUSTOMER_QRY = gql`
  # input DeliveryDetails {
  #   delivery_by: String
  #   delivery_charge: Float
  #   delivery_address: String
  #   delivery_phone: String
  # }

  mutation createUser(
    $name: String!
    $phone_no: String!
    $email: String
    # $delivery_detail: DeliveryDetails
    $address: String
    $engage: [String]
  ) {
    createUser(
      user: {
        name: $name
        phone_no: $phone_no
        email: $email
        address: $address
        engage: $engage
        # delivery_detail: $delivery_detail
      }
    ) {
      name
      phone_no
      email
      # address
      delivery_detail {
        delivery_by
      }
      # engage
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

export const CUSTOMERS_QRY = gql`
  query allCustomers {
    allUsers {
      id
      name
      phone_no
      status
      roles
      username
      email
      address
      order_status
      delivery_detail {
        delivery_by
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
    }
  }
`;
