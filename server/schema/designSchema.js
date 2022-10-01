export const Design = `
type Disign {
  _id: ID!
  design_name: String!
  designs: [DesignItem!]!
  type: [String!]!
}`;
export const DesignItem = `
type DesignItem {
  _id: String!
    item: String!
    ds_id: Int!
    icon: Icon
  }`;
export const InpDesignItem = `
input InpDesignItem {
  item: String!
  ds_id: Int!
  icon: InpIcon
}`;
export const InpIcon = `
input InpIcon {
  _id: String
  src: String
}`;

export const InputDisign = `
input InputDisign {
  design_name: String!
  designs: [InpDesignItem!]!
  type: [String!]!
}`;
export const example = ``;
export const Icon = `type Icon {
  _id: String
  src: String
}`;
export const DesignQueries = `
allDesigns(key: String, value: String): [Disign!]!
getDesign(id: ID!): Disign!
`;

export const DesignMutations = `
createDesign(design: InputDisign): Disign
updateDesign(_id: ID!, update: InputDisign): Disign
deleteDesign(_id: ID!): Boolean`;
