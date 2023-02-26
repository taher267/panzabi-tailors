import { gql } from '@apollo/client';

export const ALL_INPUT_FIELDS = gql`
  query allFields($key: String, $value: String, $options: String) {
    allFields(key: $key, value: $value, options: $options) {
      _id
      fieldGroup
      fields {
        _id
        label
        name
        type
        sl_id
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
  }
`;

export const SINGLE_INPUT_FIELD = gql`
  query getInputField($key: String!, $value: String!) {
    getInputField(key: $key, value: $value) {
      _id
      fieldGroup
      fields {
        _id
        label
        name
        type
        sl_id
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
  }
`;
