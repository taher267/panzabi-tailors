export const Order = `type Order {
    _id: ID!
    order_no: String!
    totalQty: Int!
    totalPrice: Float!
    discount: Float
    advanced: Float
    due: Float
    order_status: String
    user: String!
    delivery_date: Date!
    order_items: [OrderItemsOfOrder!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }`;
export const OrderDesign = `type OrderDesign {
    dsn_id: String!
    desc: String
  }`;
export const OrderMeasurement = `type OrderMeasurement {
    msr_id: String!
    size: String!
  }`;

export const OrderItemsOfOrder = `type OrderItemsOfOrder {
    order: [String!]!
    price: Float!
    quantity: Int!
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
  order: [String!]!
  quantity: Int!
  price: Float!
  measurements: [InputOrderMeasurement!]!
}`;
// sample: InpIcon
// order_date:Date!
// designs: [InputOrderDesign!]!

export const InputOrderDesign = `input InputOrderDesign {
  group: ID!
  items: [InputOrderDesignItems]
}`;

export const InputOrderDesignItems = `input InputOrderDesignItems {
  dsn_id: String!
  desc: String
}`;
export const InputOrder = `
input InputOrder {
  order_no: String
  previous_order: String
  totalQty: Int!
  totalPrice: Float!
  discount: Float
  advanced: Float
  due: Float!
  transport_charge: Float
  order_status: String
  order_items: [InputOrderItemsOfOrder!]!
  delivery_date:Date!
}`;

export const OrderQueries = `
allOrders(key: String, value: String): [Order!]!
getOrder(id: ID!): Order!`;

export const OrderMutations = `
createOrder(order: InputOrder): Order
updateOrder(id: ID!, update: InputOrder): Order!
deleteOrder(id: ID!): Boolean`;
