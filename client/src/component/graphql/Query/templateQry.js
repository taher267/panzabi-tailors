import { gql } from '@apollo/client';

export const ALL_TEMPATES = gql`
  query allTemplates {
    allTemplates {
      _id
      name
      templateBody
      # productsPlace {
      #   singleItemWrapper
      #   placeOn
      #   placeOnBody
      # }
      # measurementsPlace {
      #   singleItemWrapper
      #   placeOn
      #   placeOnBody
      #   replasedBy
      # }
      # designsPlace {
      #   singleItemWrapper
      #   placeOn
      #   placeOnBody
      #   replasedBy
      # }
    }
  }
`;

export const SINGLE_TEMPATE = gql`
  query singleTempate($key: String!, $value: String!) {
    singleTempate(key: $key, value: $value) {
      _id
      name
      templateBody
      productsPlace {
        singleItemWrapper
        placeOn
        placeOnBody
      }
      measurementsPlace {
        singleItemWrapper
        placeOn
        placeOnBody
        replasedBy
      }
      designsPlace {
        singleItemWrapper
        placeOn
        placeOnBody
        replasedBy
      }
    }
  }
`;
