import { gql } from '@apollo/client';
export const NEW_ORDER = gql`
  mutation createOrder($order: InputOrder!) {
    createOrder(
      order: $order # order: { #   order_no: $order_no #   quantity: $quantity
    ) {
      # _id
      order_no
      # totalQty
      # totalPrice
      # discount
      # advanced
      # user
      # order_status
      # order_items {
      #   products
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
      # createdAt
      # updatedAt
    }
  }
`;

export const ADD_NEW_ORDER_ITEM = gql`
  mutation addNewOrderItem($_id: ID!, $newItem: InputAddOrderItem!) {
    addNewOrderItem(_id: $_id, newItem: $newItem) {
      order_no
    }
  }
`;

export const EDIT_ORDER = gql`
  mutation updateOrder(
    $_id: String!
    $name: String!
    $description: String
    $price: Float
    $measurementItem: [InpMeasurementItem]
    $category: String!
  ) {
    updateOrder(
      _id: $_id
      update: {
        name: $name
        description: $description
        price: $price
        category: $category
        measurementItem: $measurementItem
      }
    ) {
      _id
      name
      description
      price
      category
      measurementItem {
        ms_id
        item_name
        measures
      }
    }
  }
`;

export const DELETE_ORDER_ITEM = gql`
  mutation deleteOrder($_id: ID!, $customer: ID!) {
    deleteOrder(_id: $_id, customer: $customer) {
      success
    }
  }
`;
