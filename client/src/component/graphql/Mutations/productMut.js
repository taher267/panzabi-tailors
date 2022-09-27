import { gql } from '@apollo/client';

export const NEW_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $description: String
    $measurementItem: [InpMeasurementItem!]!
    $price: String
    $category: String!
  ) {
    createProduct(
      product: {
        name: $name
        description: $description
        measurementItem: $measurementItem
        price: $price
        category: $category
      }
    ) {
      name
      description
      measurementItem {
        ms_id
        name
        measures
      }
      price
      category
    }
  }
`;

// export const EDIT_PRODUCT = gql`
//   mutation updateProduct(
//   ) {
//     updateProduct(
//       id: $id
//       update: {

//       }
//     ) {

//     }
//   }
// `;
