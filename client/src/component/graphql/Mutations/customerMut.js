import { gql } from '@apollo/client';

export const NEW_CUSTOMER = gql`
  # input InputDeliveryDetails {
  #   delivery_by: String
  #   delivery_charge: Float
  #   delivery_address: String
  #   delivery_phone: String
  # }

  mutation createCustomer(
    $name: String!
    $phone_no: String!
    $email: String
    $status: String
    # $delivery_detail: InputDeliveryDetails
    $address: String
    $engage: [String]
  ) {
    createCustomer(
      customer: {
        name: $name
        phone_no: $phone_no
        email: $email
        status: $status
        address: $address
        engage: $engage
        # delivery_detail: $delivery_detail
      }
    ) {
      name
      phone_no
      status
      email
      address
      # delivery_detail
      engage
      # user
      # orders
    }
  }
`;
