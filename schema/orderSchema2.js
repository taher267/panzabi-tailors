import { gql } from 'apollo-server';

export default gql`
  type Order {
    customer: ID!
    _id: ID!
    order_no: String!
    totalQty: Int!
    totalPrice: Float!
    discount: Float
    advanced: Float
    due: Float
    transport_charge: Float
    order_status: String
    user: String!
    delivery_date: Date!
    createdAt: DateTime!
    updatedAt: DateTime!
    order_items: [OrderItemsOfOrder!]!
  }

  type OrderDesignItems {
    dsn_id: String!
    desc: String
  }
  type OrderDesign {
    group: ID!
    items: [OrderDesignItems!]!
  }

  type OrderMeasurement {
    msr_id: String!
    size: String!
  }

  type OrderItemsOfOrder {
    products: [String!]!
    price: Float!
    quantity: Int!
    measurements: [OrderMeasurement!]!
    designs: [OrderDesign!]!
    order_date: Date!
    sample: Icon
  }
  input InputOrderMeasurement {
    msr_id: String!
    size: String!
  }

  input InputOrderItemsOfOrder {
    products: [String!]!
    quantity: Int!
    price: Float!
    measurements: [InputOrderMeasurement!]!
    sample: InpIcon
    order_date: Date!
    designs: [InputOrderDesign!]!
  }

  input InputOrderDesignItems {
    dsn_id: String!
    desc: String
  }
  input InputOrderDesign {
    group: String!
    items: [InputOrderDesignItems!]!
  }

  input InputOrder {
    customer: ID!
    order_no: String
    previous_order: [String!]!
    totalQty: Int!
    totalPrice: Float!
    discount: Float
    advanced: Float
    due: Float!
    transport_charge: Float
    order_status: String
    delivery_date: Date!
    order_items: [InputOrderItemsOfOrder!]!
  }
  type Query {
    allOrders(key: String, value: String): [Order!]!
    getOrder(id: ID!): Order!
  }
  type Mutation {
    createOrder(order: InputOrder!): Order!
    updateOrder(id: ID!, update: InputOrder!): Order!
    deleteOrder(id: ID!): Boolean
  }
`;
