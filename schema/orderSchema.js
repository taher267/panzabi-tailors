// customer:ID
export const Order = `type Order {
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
  }`;
export const OrderDesignItems = `type OrderDesignItems {
  dsn_id: String!
  desc: String
  }`;

export const OrderDesign = `type OrderDesign {
   group:ID!
   items:[OrderDesignItems!]!
  }`;
export const OrderMeasurement = `type OrderMeasurement {
    msr_id: String!
    size: String!
  }`;

export const OrderItemsOfOrder = `type OrderItemsOfOrder {
    products: [String!]!
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
  products: [String!]!
  quantity: Int!
  price: Float!
  measurements: [InputOrderMeasurement!]!
  designs: [InputOrderDesign!]!
  sample: InpIcon
  order_date:Date!
}`;
export const InputOrderDesignItems = `input InputOrderDesignItems {
  dsn_id: String!
  desc: String
}`;
export const InputOrderDesign = `input InputOrderDesign {
  group: ID!
  items: [InputOrderDesignItems!]!
}`;

export const InputOrder = `
input InputOrder {
  customer:ID!
  order_no: String
  previous_order: String
  totalQty: Int!
  totalPrice: Float!
  discount: Float
  advanced: Float
  due: Float!
  transport_charge: Float
  order_status: String
  delivery_date:Date!
  order_items: [InputOrderItemsOfOrder!]!
}`;

export const OrderQueries = `
allOrders(key: String, value: String): [Order!]! 
getOrder(id: ID!): Order!`;

export const OrderMutations = `
createOrder(order: InputOrder): Order
updateOrder(id: ID!, update: InputOrder): Order!
deleteOrder(id: ID!): Boolean`;
