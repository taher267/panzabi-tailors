export const Order = `type Order {
    _id: ID!
    order_no: String!
    quantity: Float!
    totalPrice: Float!
    discunt: Float
    advanced: Float
    due: Float
    order_status: String
    user: String!
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
  measurements: [InputOrderMeasurement!]!
  designs: [InputOrderDesign!]!
  sample: InpIcon
  order_date:Date!
}`;

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
  order_no: String!
  previous_order: String
  quantity: Float!
  totalPrice: Float!
  discunt: Float
  advanced: Float
  due: Float
  transport_charge: Float
  user: String
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
