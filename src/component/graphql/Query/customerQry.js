import { gql } from '@apollo/client ';

export const ALL_CUSTOMERS = gql`
  query allCustomers {
    allCustomers {
      _id
      name
      phone_no
      status
      email
      address
      order_status
      transportation {
        transport_name
        receiver_address
        receiver_phone
      }
      engage
      user {
        name
        _id
      }
      orders
      createdAt
      updatedAt
    }
  }
`;
export const SINGLE_CUSTOMER = gql`
  query getCustomer($key: String!, $value: String!) {
    getCustomer(key: $key, value: $value) {
      _id
      name
      phone_no
      status
      email
      address
      order_status
      # transportation {
      #   transport_charge
      #   delivery_charge
      #   receiver_address
      #   receiver_phone
      # }
      engage
      # user
      orders
      createdAt
      updatedAt
    }
  }
`;
