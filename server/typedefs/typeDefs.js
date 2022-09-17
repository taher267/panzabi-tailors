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
    _id: String!
    size: String!
  }
  type Orders {
    order: String!
    price: Int!
    measurements: [OrderMeasurement!]!
  }

  type Order {
    id: ID!
    order_no: Int!
    quantity: Int!
    totalPrice: Int!
    discunt: Int
    advanced: Int
    user: String!
    order_status: String
    orders: [Orders!]!
    designs: [String!]
    createdAt: String!
    updatedAt: String!
  }
  # Order Query End

  # Measurement Query Start
  type Measurement {
    id: ID!
    name: String!
    icon: Icon
  }
  # Measurement Query End
  # User Query Start
  type Delivery {
    delivery_by: String
    delivery_charge: Float
    location: String
    delivery_phone: String
  }
  type User {
    name: String!
    phone_no: String!
    status: String
    roles: [String]
    email: String
    address: String
    order_status: String
    delivery_detail: Delivery
    createdAt: String!
    updatedAt: String!
  }
  # User Query End
  # Product Query Start
  type MeasurementItem {
    _id: Int!
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
    _id: String!
    src: String!
  }
  type DesignItem {
    item: String!
    _id: Int!
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
    createUser(user: InputUser): User
    updateUser(id: ID!, update: InputUser): User
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
    _id: String!
    size: String!
  }
  input InputOrders {
    order: String!
    price: Int!
    measurements: [InputOrderMeasurement!]!
  }

  input InputOrder {
    id: ID!
    order_no: Int!
    quantity: Int!
    totalPrice: Int!
    discunt: Int
    advanced: Int
    user: String!
    order_status: String
    orders: [InputOrders!]!
    designs: [String!]
    createdAt: String!
    updatedAt: String!
  }
  # Order Mutation Start
  # Measurement Mutation Start
  input InputMeasurement {
    name: String!
    icon: InpIcon
  }
  # Measurement Mutation End
  # User mutation Start
  input InputDelivery {
    delivery_by: String
    delivery_charge: Float
    location: String
    delivery_phone: String
  }
  input InputUser {
    name: String!
    phone_no: String!
    status: String
    roles: [String]
    email: String
    address: String
    order_status: String
    delivery_detail: InputDelivery
  }
  # User mutation End

  # Design mutation Start
  input InpDesignItem {
    item: String!
    _id: Int!
  }
  input InpIcon {
    _id: String!
    src: String!
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
    _id: Int!
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
