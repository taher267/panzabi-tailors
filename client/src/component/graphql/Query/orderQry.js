import { gql } from '@apollo/client';
const Product = `products {
  name
}`;
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
      customer
      # order_items {
      #   products {
      #     name
      #   }
      #   price
      #   measurements {
      #     msr_id
      #     size
      #   }
      #   designs {
      #     group
      #     items {
      #       dsn_id
      #       desc
      #     }
      #   }
      #   order_date
      #   sample {
      #     _id
      #     src
      #   }
      # }
      delivery_date
      createdAt
      updatedAt
    }
  }
`;

export const SINGLE_ORDER = gql`
  query getOrder($key: String!, $value: String!) {
    getOrder(key: $key, value: $value) {
      _id
      order_no
      totalQty
      totalPrice
      discount
      advanced
      customerDetail {
        name
        phone_no
        email
        transportation {
          transport_name
        }
      }
      due
      transport_charge
      # user
      order_status
      order_items {
        _id
        quantity
        products {
          name
          _id
        }
        price
        measurements {
          msr_id
          label
          size
        }
        designs {
          group
          items {
            dsn_id
            label
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

export const SINGLE_ORDER_BASIC = gql`
  query getOrder($key: String!, $value: String!) {
    getOrder(key: $key, value: $value) {
      _id
      order_no
      totalQty
      totalPrice
      discount
      advanced
      customer
      due
      transport_charge
      order_status
      createdAt
      updatedAt
    }
  }
`;
