import { gql } from '@apollo/client';
const Product = `products {
  name
}`;

const Customer = ` customer {
  _id
  name
  phone_no
  email
  
}`;
// # transportation {
//   #   transport_name
//   # }
export const ALL_ORDERS = gql`
  query allOrders($key: String, $value: String, $options:Options) {
    allOrders(key: $key, value: $value, options:$options) {
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
      ${Customer}
      delivery_date
      createdAt
      updatedAt
      
    }
  }
`;
// userOrderItems
export const USER_ORDERS_ITEMS = gql`
  query allOrders($key: String, $value: String, $options: Options) {
    allOrders(key: $key, value: $value, options: $options) {
      _id
      order_no
      # totalQty
      # totalPrice
      # order_status
      # delivery_date
      createdAt
      order_items {
        _id
        quantity
        connection
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
      ${Customer}
      due
      transport_charge
      # user
      order_status
      order_items {
        _id
        quantity
        connection
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
export const ORDER_ITEM = gql`
  query getOrderItem($id: ID!, $key: String!) {
    getOrderItem(id: $id, key: $key) {
      order_no
      _id
      quantity
      connection
      products {
        name
        # _id
      }
      price
      htmlTemplate
      measurements {
        # msr_id
        label
        size
      }
      designs {
        group
        items {
          # dsn_id
          label
          desc
        }
      }
      # order_date
      sample {
        _id
        src
      }
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
      ${Customer}
      due
      transport_charge
      order_status
      createdAt
      updatedAt
    }
  }
`;
