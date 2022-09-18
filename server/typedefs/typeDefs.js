import { gql } from 'apollo-server-express';
export default gql`
  type Query {
    designs(key: String, value: String): [Disign!]!
    getDesign(id: ID!): Disign!
    # Product
    allProducts(key: String, value: String): [Product!]!
    getProduct(id: ID!): Product
    # User
    allUsers(key: String, value: String): [User]
    getUser(id: ID!): User
    # Measurement
    allMeasurements(key: String, value: String): [Measurement!]!
    getMeasurement(id: ID!): Measurement!
    # Order
    allOrders(key: String, value: String): [Order!]!
    getOrder(id: ID!): Order!
  }
  # Order Query Start
  type OrderMeasurement {
    msr_id: String!
    size: String!
  }
  type OrderItemsOfOrder {
    order: String!
    price: Int!
    measurements: [OrderMeasurement!]!
    designs: [OrderDesign!]!
    sample: Icon
  }
  type OrderDesign {
    dsn_id: String!
    desc: String!
  }
  type Order {
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
  }
  # Order Query End

  # Measurement Query Start
  type Measurement {
    id: ID!
    sl_id: String!
    name: String!
    icon: Icon
  }
  # Measurement Query End
  # User Query Start
  type DeliveryDetails {
    delivery_by: String
    delivery_charge: Float
    delivery_address: String
    delivery_phone: String
  }
  type thirdPirtyDetails {
    via3rd: Boolean
    name: String
    token: String
    token_secret: String
    client_id: String
  }

  type User {
    id: ID!
    name: String!
    phone_no: String!
    status: String
    roles: [String]
    username: String
    email: String
    address: String
    order_status: String
    delivery_detail: DeliveryDetails
    engage: [String]
    user: String!
    orders: [String]
    thirdPirty: [thirdPirtyDetails]
    createdAt: String!
    updatedAt: String!
  }
  # User Query End
  # Product Query Start
  type MeasurementItem {
    ms_id: Int!
    name: String!
    measures: String
  }

  type Product {
    id: ID!
    name: String!
    description: String
    measurementItem: [MeasurementItem!]!
    price: Float
    category: String
  }
  # Product Query End
  # Design Query Start
  type Disign {
    id: ID!
    name: String!
    designs: [DesignItem!]!
    type: Int!
    icon: Icon
  }
  type Icon {
    id: String
    src: String
  }
  type DesignItem {
    item: String!
    ds_id: Int!
  }
  # Design Query End

  type Mutation {
    # Design
    createDesign(design: InputDisign): Disign
    updateDesign(id: ID!, update: InputDisign): Disign
    deleteDesign(id: ID!): Boolean
    # Product
    createProduct(product: Input_poduct): Product
    updateProduct(id: ID!, update: Input_poduct): Product
    deleteProduct(id: ID!): Boolean
    # User
    createUser(user: InputCustomer): User
    updateUser(id: ID!, update: InputCustomer): User
    deleteUser(id: ID!): Boolean
    # Measurement
    createMeasurement(measures: InputMeasurement): Measurement
    updateMeasurement(id: ID!, update: InputMeasurement): Measurement
    deleteMeasurement(id: ID!): Boolean

    # Order
    createOrder(order: InputOrder): Order
    updateOrder(id: ID!, update: InputOrder): Order
    deleteOrder(id: ID!): Boolean
  }
  # Order Mutation Start
  input InputOrderMeasurement {
    msr_id: String!
    size: String!
  }
  input InputOrderItemsOfOrder {
    order: String!
    price: Int!
    measurements: [InputOrderMeasurement!]!
    designs: [InputOrderDesign!]!
    sample: InpIcon
  }
  input InputOrderDesign {
    dsn_id: String!
    desc: String!
  }
  input InputOrder {
    order_no: String!
    quantity: Int!
    totalPrice: Int!
    discunt: Int
    advanced: Int
    user: String!
    order_status: String
    order_items: [InputOrderItemsOfOrder!]!
  }
  # Order Mutation Start
  # Measurement Mutation Start
  input InputMeasurement {
    sl_id: String!
    name: String!
    icon: InpIcon
  }
  # Measurement Mutation End

  # User mutation Start
  input InputDelivery {
    delivery_by: String
    delivery_charge: Float
    delivery_address: String
    delivery_phone: String
  }
  input InputThirdPirty {
    via3rd: Boolean
    name: String
    token: String
    token_secret: String
    client_id: String
  }
  input InputCustomer {
    name: String!
    phone_no: String!
    email: String
    engage: [String]
    address: String
    delivery_detail: InputDelivery
  }
  # User mutation End

  # Design mutation Start
  input InpDesignItem {
    item: String!
    ds_id: Int!
  }
  input InpIcon {
    id: String
    src: String
  }
  input InputDisign {
    name: String!
    designs: [InpDesignItem!]!
    type: Int!
    icon: InpIcon
  }
  # Design mutation end
  # Product mutation Start
  input InpMeasurementItem {
    ms_id: Int!
    name: String!
    measures: String
  }

  input Input_poduct {
    name: String!
    description: String
    measurementItem: [InpMeasurementItem!]!
    price: Float
    category: String
  }
  # Product mutation end
`;
