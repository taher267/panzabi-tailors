import { gql } from '@apollo/client';

export const ALL_MEASUREMENTS = gql`
  query allMeasurements {
    allMeasurements {
      id
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
      id
      sl_id
      name
      icon {
        id
        src
      }
    }
  }
`;
