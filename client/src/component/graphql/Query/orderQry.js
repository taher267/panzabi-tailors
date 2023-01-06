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
      customerDetail {
        _id
        name
        phone_no
        email
        transportation {
          transport_name
        }
      }
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
      customer
      customerDetail {
        _id
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
      customer
      due
      transport_charge
      order_status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ORDER_ITEM = gql`
  query UpdateOrderItem($id: ID!, $key: String!) {
    UpdateOrderItem(id: $id, key: $key) {
      order_no
      _id
      quantity
      connection
      products {
        name
        # _id
      }
      price
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