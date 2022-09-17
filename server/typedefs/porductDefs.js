import { gql } from 'apollo-server-express';
export default gql`
  #   Query-----------------?
  type Query {
    allProducts: [Product!]!
  }
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

  #Mutatin-------------------->
  type Mutation {
    createProduct(product: Input_poduct): Product
  }

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
`;
