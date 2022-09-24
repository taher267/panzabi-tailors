export const Order = `type Order {
    id: ID!
    order_no: String!
    quantity: Int!
    totalPrice: Int!
    discunt: Int
    advanced: Int
    user: String!
    order_status: String
    order_items: [OrderItemsOfOrder!]!
    createdAt: String!
    updatedAt: String!
  }`;
export const OrderDesign = `type OrderDesign {
    dsn_id: String!
    desc: String!
  }`;
export const OrderMeasurement = `type OrderMeasurement {
    msr_id: String!
    size: String!
  }`;
export const OrderItemsOfOrder = `type OrderItemsOfOrder {
    order: String!
    price: Int!
    measurements: [OrderMeasurement!]!
    designs: [OrderDesign!]!
    sample: Icon
  }`;
export const InputOrderMeasurement = `
input InputOrderMeasurement {
  msr_id: String!
  size: String!
}`;

export const InputOrderItemsOfOrder = `
input InputOrderItemsOfOrder {
  order: String!
  price: Int!
  measurements: [InputOrderMeasurement!]!
  designs: [InputOrderDesign!]!
  sample: InpIcon
}`;
export const InputOrderDesign = `input InputOrderDesign {
  dsn_id: String!
  desc: String!
}`;
export const InputOrder = `
input InputOrder {
  order_no: String!
  quantity: Int!
  totalPrice: Int!
  discunt: Int
  advanced: Int
  user: String!
  order_status: String
  order_items: [InputOrderItemsOfOrder!]!
}`;

export const OrderQueries = `
allOrders(key: String, value: String): [Order!]!
getOrder(id: ID!): Order!`;

export const OrderMutations = `
createOrder(order: InputOrder): Order
updateOrder(id: ID!, update: InputOrder): Order!
deleteOrder(id: ID!): Boolean`;
