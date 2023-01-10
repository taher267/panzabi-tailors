export const MeasurementItem = `
type MeasurementItem {
  ms_id: Int
  item_name: String
  measures: String
}`;
export const Product = `
type Product {
  _id: ID!
  name: String!
  description: String
  price: Float
  category: String
  measurementItem: [MeasurementItem]
  }`;
export const InpMeasurementItem = `
input InpMeasurementItem {
  ms_id: Int!
  item_name: String!
  measures: String
}`;

export const InputPoduct = `
input InputPoduct {
  name: String!
  description: String
  price: Float
  category: String
  measurementItem: [InpMeasurementItem]
}`;

export const example = ``;

export const ProductQueries = `
allProducts(key: String, value: String): [Product!]!
getProduct(id: ID!): Product`;

export const ProductMutations = `
createProduct(product: InputPoduct): Product
updateProduct(_id: ID!, update: InputPoduct): Product
deleteProduct(_id: ID!): Boolean`;
