import { gql } from '@apollo/client';

export const ALL_PRODUCTS = gql`
  query allProducts {
    allProducts {
      _id
      name
      description
      measurementItem {
        ms_id
        item_name
        measures
      }
      price
      category
    }
  }
`;

export const PRODUCTS_NAME_ID_CAT = gql`
  query allProducts {
    allProducts {
      _id
      name
      category
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
