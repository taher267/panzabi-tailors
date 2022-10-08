import { gql } from '@apollo/client';

export const NEW_ORDER = gql`
  mutation createOrder(
    # $order_no: String!
    # $quantity: Float!
    # $totalPrice: Float!
    # $discunt: Float
    # $advanced: Float
    # $order_status: String
    # order_items: [OrderItemsOfOrder!]!
    $order: InputOrder
  ) {
    createOrder(order: $order) # order: {
    #   order_no: $order_no
    #   quantity: $quantity
    #   totalPrice: $totalPrice
    #   discunt: $discunt
    #   advanced: $advanced
    #   order_status: $order_status
    # }
    {
      _id
      order_no
      quantity
      # totalPrice
      # discunt
      # advanced
      # user
      # order_status
      # order_items {
      #   order
      #   price
      #   measurements {
      #     msr_id
      #     size
      #   }
      #   designs {
      #     dsn_id
      #     desc
      #   }
      #   orderAt
      #   sample
      # }
      # createdAt
      # updatedAt
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
