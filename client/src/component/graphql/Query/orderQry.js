import { gql } from '@apollo/client';
export const ALL_ORDERS = gql`
  query allOrders($key: String, $value: String) {
    allOrders(key: $key, value: $value) {
      _id
      order_no
      totalQty
      totalPrice
      discount
      advanced
      # user
      order_status
      due
      transport_charge
      order_items {
        products
        price
        measurements {
          msr_id
          size
        }
        designs {
          group
          items {
            dsn_id
            desc
          }
        }
        order_date
        sample {
          _id
          src
        }
      }
      delivery_date
      createdAt
      updatedAt
    }
  }
`;

export const SINGLE_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      _id
      order_no
      totalQty
      totalPrice
      discount
      advanced
      customer {
        name
        phone_no
        email
        # transportation {
        #   transport_name
        # }
      }
      due
      transport_charge
      # user
      order_status
      order_items {
        products
        price
        measurements {
          msr_id
          size
        }
        designs {
          group
          items {
            dsn_id
            desc
          }
        }
        order_date
        sample {
          _id
          src
        }
      }
      createdAt
      updatedAt
    }
  }
`;
