import { gql } from '@apollo/client';

export const NEW_CUSTOMER = gql`
  # input InputTransportation {
  #   transport_charge
  #   delivery_charge
  #   receiver_address
  #   receiver_phone
  # }

  mutation createCustomer(
    $name: String!
    $phone_no: String!
    $email: String
    $status: String
    # $transportation: InputTransportation
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
        # transportation: $transportation
      }
    ) {
      name
      phone_no
      status
      email
      address
      # delivery_detail
      engage
      user {
        id
        # name
        # phone_no
        # status
        # roles
        # username
        # email
        # createdAt
        # updatedAt
      }
      # orders
    }
  }
`;

export const EDIT_CUSTOMER = gql`
  mutation updateCustomer(
    $id: String!
    $name: String!
    $phone_no: String!
    $email: String
    $status: String
    # $transportation: InputTransportation
    $address: String
    $engage: [String]
  ) {
    updateCustomer(
      id: $id
      update: {
        name: $name
        phone_no: $phone_no
        email: $email
        status: $status
        address: $address
        engage: $engage
        # transportation: $transportation
      }
    ) {
      name
      phone_no
      status
      email
      address
      # delivery_detail
      engage
      # user {
      #   id
      #   name
      # phone_no
      # status
      # roles
      # username
      # email
      # createdAt
      # updatedAt
      # }
      # orders
    }
  }
`;
