import { gql } from '@apollo/client';

export const ALL_PRODUCTS = gql`
  query allProducts {
    allProducts {
      _id
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
