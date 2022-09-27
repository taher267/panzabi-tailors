export const Product = `
type Product {
    _id: ID!
    name: String!
    description: String
    measurementItem: [MeasurementItem!]!
    price: Float
    category: String
  }`;
export const InpMeasurementItem = `
input InpMeasurementItem {
  ms_id: Int!
  name: String!
  measures: String
}`;

export const InputPoduct = `
input InputPoduct {
  name: String!
  description: String
  measurementItem: [InpMeasurementItem!]!
  price: Float
  category: String
}`;
export const example = ``;
export const MeasurementItem = `
type MeasurementItem {
  ms_id: Int!
  name: String!
  measures: String
}`;

export const ProductQueries = `allProducts(key: String, value: String): [Product!]!
getProduct(id: ID!): Product`;

export const ProductMutations = `
createProduct(product: InputPoduct): Product
updateProduct(id: ID!, update: InputPoduct): Product
deleteProduct(id: ID!): Boolean`;
