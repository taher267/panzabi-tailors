import { gql } from 'apollo-server';

export default gql`
  type Orders {
    _id: ID!
    customer: OrderCustomer!
    order_no: String!
    totalQty: Int!
    totalPrice: Float!
    discount: Float
    advanced: Float
    due: Float
    transport_charge: Float
    order_status: String
    delivery_date: Date!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Order {
    _id: ID
    customer: OrderCustomer!
    order_no: String
    totalQty: Int
    totalPrice: Float
    discount: Float
    advanced: Float
    due: Float
    transport_charge: Float
    order_status: String
    delivery_date: Date
    createdAt: DateTime
    updatedAt: DateTime
    order_items: [OrderItemsOfOrder!]!
    notes: String
  }
  type OrderCustomer {
    _id: String!
    name: String!
    phone_no: String!
    email: String
  }
  type BasicOrder {
    _id: ID
    customer: String
    order_no: String
    totalQty: Int
    totalPrice: Float
    discount: Float
    advanced: Float
    due: Float
    transport_charge: Float
    order_status: String
    delivery_date: Date
    createdAt: DateTime
    updatedAt: DateTime
  }

  type OrderDesignItems {
    dsn_id: String!
    label: String!
    desc: String
  }

  type OrderDesign {
    group: ID!
    items: [OrderDesignItems!]!
  }

  type OrderMeasurement {
    msr_id: String!
    size: String!
    label: String!
  }

  type orderProduct {
    _id: ID!
    name: String!
  }

  type OrderItemsOfOrder {
    _id: ID!
    connection: String!
    products: [orderProduct!]!
    price: Float!
    quantity: Int!
    measurements: [OrderMeasurement!]!
    designs: [OrderDesign!]!
    order_date: Date!
    sample: Icon
    # user:User
  }

  type OrderItem {
    _id: ID!
    connection: String!
    products: [orderProduct!]!
    price: Float!
    quantity: Int!
    htmlTemplate: String
    measurements: [OrderMeasurement!]!
    designs: [OrderDesign!]!
    order_date: Date!
    sample: Icon
    order_no: String!
  }
  input InputOrderMeasurement {
    msr_id: String!
    size: String!
    label: String!
  }
  input inputOrderProduct {
    _id: ID!
    name: String!
  }
  input InputOrderItemsOfOrder {
    connection: String!
    products: [inputOrderProduct!]!
    user: String!
    quantity: Int!
    price: Float!
    measurements: [InputOrderMeasurement!]!
    sample: InpIcon
    order_date: Date!
    designs: [InputOrderDesign!]!
  }
  input InputOrderDesignItems {
    dsn_id: ID!
    label: String!
    desc: String
  }
  input InputOrderDesign {
    group: String!
    items: [InputOrderDesignItems!]!
  }
  input InputOrder {
    customer: ID!
    order_no: String
    # @constraint(minLength: 5)
    previous_order: String
    totalQty: Int!
    totalPrice: Float!
    # @constraint(min: 500000)
    discount: Float
    advanced: Float
    due: Float!
    transport_charge: Float
    order_status: String
    delivery_date: Date!
    order_items: [InputOrderItemsOfOrder!]!
    notes: String
  }

  input PaymentUpdate {
    on: String
    amount: Int
    discount: Int
    order_status: String
  }

  type PaymentUpdateReturn {
    on: String
    amount: Int
    discount: Int
    order_status: String
  }

  input InputAddOrderItem {
    customer: ID
    order_no: String
    previous_order: String!
    totalQty: Int!
    totalPrice: Float!
    discount: Float
    advanced: Float
    due: Float!
    transport_charge: Float
    order_status: String
    delivery_date: Date
    order_items: [InputOrderItemsOfOrder!]!
    notes: String
  }
  input InputUpdateOrderItem {
    itemId: String!
    products: [inputOrderProduct!]!
    price: Float!
    quantity: Int!
    # connection: String!
    measurements: [InputOrderMeasurement!]!
    designs: [InputOrderDesign!]!
    sample: InpIcon
  }

  type Del {
    success: Boolean
  }
  type Query {
    allOrders(key: String, value: String): [Orders!]!
    getOrder(key: String!, value: String!): Order
    getOrderItem(id: ID!, key: String!): OrderItem!
    # basicOrder(key: String!, value: String!): BasicOrder
  }
  type Mutation {
    createOrder(order: InputOrder!): Order!
    addNewOrderItem(_id: ID!, newItem: InputAddOrderItem!): Order!
    updateOrder(id: ID!, update: InputOrder!): Order!
    updateOrderItem(_id: ID!, update: InputUpdateOrderItem!): Boolean!
    updatePayment(id: ID!, update: PaymentUpdate!): Boolean!
    deleteOrder(_id: ID!, customer: ID!): Del!
  }
`;
