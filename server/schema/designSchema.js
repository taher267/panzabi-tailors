export const Design = `
type Disign {
  id: ID!
  name: String!
  designs: [DesignItem!]!
  type: Int!
  icon: Icon
}`;
export const DesignItem = `
type DesignItem {
    item: String!
    ds_id: Int!
  }`;
export const InpDesignItem = `
input InpDesignItem {
  item: String!
  ds_id: Int!
}`;
export const InpIcon = `
input InpIcon {
  id: String
  src: String
}`;

export const InputDisign = `
input InputDisign {
  name: String!
  designs: [InpDesignItem!]!
  type: Int!
  icon: InpIcon
}`;
export const example = ``;
export const Icon = `type Icon {
  id: String
  src: String
}`;
export const DesignQueries = `
designs(key: String, value: String): [Disign!]!
getDesign(id: ID!): Disign!
`;

export const DesignMutations = `
createDesign(design: InputDisign): Disign
updateDesign(id: ID!, update: InputDisign): Disign
deleteDesign(id: ID!): Boolean`;
