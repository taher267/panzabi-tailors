import { gql } from 'graphql-tag';

export const NEW_USER = gql`
  input InputDeliveryDetails {
    delivery_by: String
    delivery_charge: Float
    delivery_address: String
    delivery_phone: String
  }

  mutation createUser(
    $name: String!
    $phone_no: String!
    $email: String
    $delivery_detail: InputDeliveryDetails
    $address: String
    $engage: [String]
  ) {
    createUser(
      user: {
        name: $name
        phone_no: $phone_no
        email: $email
        status: $status
        address: $address
        engage: $engage
        delivery_detail: $delivery_detail
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
