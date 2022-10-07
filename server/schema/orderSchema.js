export const Order = `type Order {
    _id: ID!
    order_no: String!
    quantity: Float!
    totalPrice: Float!
    discunt: Float
    advanced: Float
    due: Float
    user: String!
    order_status: String
    delivery_date: Date!
    createdAt: DateTime!
    updatedAt: DateTime!
  }`;
// order_items: [OrderItemsOfOrder!]!
export const OrderDesign = `type OrderDesign {
    dsn_id: String!
    desc: String
  }`;
export const OrderMeasurement = `type OrderMeasurement {
    msr_id: String!
    size: String!
  }`;
export const OrderItemsOfOrder = `type OrderItemsOfOrder {
    order: String!
    price: Float!
    measurements: [OrderMeasurement!]!
    designs: [OrderDesign!]!
    order_date:Date!
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
  price: Float!
  designs: [InputOrderDesign!]!
  sample: InpIcon
}`;
// measurements: [InputOrderMeasurement!]!
export const InputOrderDesign = `input InputOrderDesign {
  dsn_id: String!
  desc: String
}`;
export const InputOrder = `
input InputOrder {
  order_no: String!
  quantity: Float!
  totalPrice: Float!
  discunt: Float
  advanced: Float
  order_status: String
}`;
// order_items: [InputOrderItemsOfOrder!]!

export const OrderQueries = `
allOrders(key: String, value: String): [Order!]!
getOrder(id: ID!): Order!`;

export const OrderMutations = `
createOrder(order: InputOrder): Order
updateOrder(id: ID!, update: InputOrder): Order!
deleteOrder(id: ID!): Boolean`;
