import { gql } from 'apollo-server';

export default gql`
  type ProductsPlace {
    singleItemWrapper: String!
    placeOn: String!
    replaceOn: String!
  }
  type Tempate {
    name: String!
    temp: String!
    productsPlace: ProductsPlace!
  }
  input InputsTempate {
    name: String!
    templateBody: String!
    productsPlace: InputProductsPlace
    measurementsPlace: InputMeasurementDesignPlace
    designsPlace: InputMeasurementDesignPlace
  }

  input InputProductsPlace {
    singleItemWrapper: String
    placeOn: String
    placeOnBody: String
  }

  input InputMeasurementDesignPlace {
    singleItemWrapper: String
    placeOn: String
    placeOnBody: String
    replasedBy: String
  }

  input InputDesignsPlace {
    singleItemWrapper: String
    placeOn: String
    placeOnBody: String
  }

  # type Query {
  #   allTemplates(key: String, value: String): [Tempate!]!
  #   getTempate(key: String!, value: String!): Tempate!
  # }
  type Mutation {
    createTemplate(newData: InputsTempate!): Boolean!
  }
`;
/**
 * 
 *   type Query {
    allOrders(key: String, value: String): [Orders!]!
    getOrder(key: String!, value: String!): Order!
    getOrderItem(id: ID!, key: String!): OrderItem!
    # basicOrder(key: String!, value: String!): BasicOrder
  }
 *  type Mutation {
    createOrder(order: InputOrder!): Order!
    addNewOrderItem(_id: ID!, newItem: InputAddOrderItem!): Order!
    updateOrder(id: ID!, update: InputOrder!): Order!
    updateOrderItem(_id: ID!, update: InputUpdateOrderItem!): Boolean!
    updatePayment(id: ID!, update: PaymentUpdate!): Boolean!
    deleteOrder(_id: ID!, customer: ID!): Del!
  }
 */
