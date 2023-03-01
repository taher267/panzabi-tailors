import { gql } from 'apollo-server';
const common = `
    order_no: String
    totalQty: Int!
    totalPrice: Float!
    discount: Float
    advanced: Float
    due: Float!
    transport_charge: Float
    additional_charge: Float
    order_status: String
    delivery_date: Date!
    notes: String
`;
export default gql`
  type Order {
    ${common}
     _id: ID
    customer: OrderCustomer!
    createdAt: DateTime
    updatedAt: DateTime
    order_items: [OrderItemsOfOrder!]!
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
    _id: ID
    connection: String
    products: [orderProduct]
    price: Float
    quantity: Int
    measurements: [OrderMeasurement]
    designs: [OrderDesign]
    order_date: Date
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
  input InputOrder {
    ${common}
    previous_order: String
    customer: ID!
    order_items: [InputOrderItemsOfOrder!]!
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

  input Options {
    select: String
    populate: [[String]]
  }

  type Query {
    allOrders(key: String, value: String, options: Options): [Order!]
    # userOrderItems(key: String, value: String, options: Options): [Orders]
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
