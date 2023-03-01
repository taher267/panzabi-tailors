import { gql } from '@apollo/client';
const common = `
      _id
      name
      category`;
export const ALL_PRODUCTS = gql`
  query allProducts {
    allProducts {
      ${common}
      description
      measurementItem {
        ms_id
        item_name
        measures
      }
      price
    }
  }
`;

export const PRODUCTS_NAME_ID_CAT = gql`
  query allProducts ($key: String, $value: String){
    allProducts (key: $key, value: $value){
     ${common}
    }
  }
`;

export const SINGLE_PRODUCT = gql`
  query getProduct($key: String!, $value: String!) {
    getProduct(key: $key, value: $value) {
      _id
      sl_id
      name
      icon {
        id
        src
      }
    }
  }
`;
