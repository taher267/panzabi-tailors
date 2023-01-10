import { gql } from 'apollo-server-express';
export default gql`
  type Query {
    designs: [Disign!]!
    getDesign(id: ID!): Disign!
    # allProducts: [Product!]!
  }

  type Product {
    id: ID!
    name: String!
    designs: [DesingItem!]!
    type: Int!
    icon: Icon
  }

  type Disign {
    id: ID!
    name: String!
    designs: [DesingItem!]!
    type: Int!
    icon: Icon
  }
  type Icon {
    _id: String!
    src: String!
  }
  type DesingItem {
    item: String!
    _id: Int!
  }

  type Mutation {
    createDesign(design: InputDisign): Disign
    updateDesign(id: ID!, update: InputDisign): Disign
    deleteDesign(id: ID!): Boolean
  }
  # Create
  input InpDesingItem {
    item: String!
    _id: Int!
  }
  input InpIcon {
    _id: String!
    src: String!
  }
  input InputDisign {
    name: String!
    designs: [InpDesingItem!]!
    type: Int!
    icon: InpIcon
  }
`;
