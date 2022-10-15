import { gql } from '@apollo/client';

export const NEW_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $description: String
    $price: Float
    $measurementItem: [InpMeasurementItem]
    $category: String!
  ) {
    createProduct(
      product: {
        name: $name
        description: $description
        price: $price
        category: $category
        measurementItem: $measurementItem
      }
    ) {
      _id
      name
      description
      price
      category
      measurementItem {
        ms_id
        item_name
        measures
      }
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation updateProduct(
    $_id: ID!
    $name: String!
    $description: String
    $price: Float
    $measurementItem: [InpMeasurementItem]
    $category: String!
  ) {
    updateProduct(
      _id: $_id
      update: {
        name: $name
        description: $description
        price: $price
        category: $category
        measurementItem: $measurementItem
      }
    ) {
      _id
      name
      description
      price
      category
      measurementItem {
        ms_id
        item_name
        measures
      }
    }
  }
`;

// export const ProductOutput = gql`
//   {
//     _id
//     name
//     description
//     price
//     category
//     measurementItem {
//       ms_id
//       item_name
//       measures
//     }
//   }
// `;
