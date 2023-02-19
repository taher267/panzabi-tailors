import { gql } from 'apollo-server';
export default gql`
  type Disign {
    _id: ID!
    design_name: String!
    designs: [DesignItem!]!
    type: [String!]!
  }
  type DesignItem {
    _id: String!
    item: String!
    ds_id: Int!
    status: Int
    icon: Icon
  }
  input InpDesignItem {
    item: String!
    ds_id: Int!
    _id: String

    # status: Boolean
    icon: InpIcon
  }
  input InpIcon {
    _id: String
    src: String
  }
  input InputDisign {
    design_name: String!
    designs: [InpDesignItem!]!
    type: [String!]!
  }

  type Icon {
    _id: String
    src: String
  }
  type Query {
    allDesigns(key: String, value: String): [Disign!]!
    getDesign(key: String!, value: String!): Disign!
  }
  type Mutation {
    createDesign(design: InputDisign): Disign
    updateDesign(_id: ID!, update: InputDisign): Disign
    deleteDesign(_id: ID!): Boolean
  }
`;

//রাবার,ফিতা,পকেট,চেইন
