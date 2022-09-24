import { gql } from '@apollo/client';

export const ALL_MEASUREMENTS = gql`
  query allMeasurements {
    allMeasurements {
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

export const SINGLE_MEASUREMENT = gql`
  query getMeasurement($key: String!, $value: String!) {
    getMeasurement(key: $key, value: $value) {
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
