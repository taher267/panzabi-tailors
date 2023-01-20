import { gql } from 'apollo-server';

export default gql`
  type MeasurementItem {
    ms_id: Int
    item_name: String
    measures: String
  }

  type Product {
    _id: ID!
    name: String!
    description: String
    price: Float
    category: String
    measurementItem: [MeasurementItem]
  }

  input InpMeasurementItem {
    ms_id: Int!
    item_name: String!
    measures: String
  }

  input InputPoduct {
    name: String!
    description: String
    price: Float
    category: String
    measurementItem: [InpMeasurementItem]
  }

  type Query {
    allProducts(key: String, value: String): [Product!]!
    getProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(product: InputPoduct): Product
    updateProduct(_id: ID!, update: InputPoduct): Product
    deleteProduct(_id: ID!): Boolean
  }
`;
