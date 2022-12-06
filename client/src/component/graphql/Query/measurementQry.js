import { gql } from '@apollo/client';

export const ALL_MEASUREMENTS = gql`
  query allMeasurements($key: String, $value: String, $options: String) {
    allMeasurements(key: $key, value: $value, options: $options) {
      _id
      name
      label
      sl_id
      type
      template
      status
      options
      params
      validation
      placeholder
      icon {
        _id
        src
      }
    }
  }
`;

export const SINGLE_MEASUREMENT = gql`
  query getMeasurement($key: String!, $value: String!) {
    getMeasurement(key: $key, value: $value) {
      _id
      name
      label
      sl_id
      type
      template
      status
      options
      validation
      placeholder
      params
      icon {
        _id
        src
      }
    }
  }
`;
