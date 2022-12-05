import { gql } from '@apollo/client';

export const NEW_MEASUREMENT = gql`
  mutation createMeasurement($measures: InputMeasurement!) {
    createMeasurement(measures: $measures) {
      # _id
      # sl_id
      name
      # icon {
      #   id
      #   src
      # }
    }
  }
`;

export const EDIT_MEASUREMENT = gql`
  mutation updateMeasurement(
    $id: String!
    $update: InputMeasurement # $name: String! # $sl_id: String! # $icon: InpIcon
  ) {
    updateMeasurement(id: $id, update: $update) {
      #  { name: $name, sl_id: $sl_id }
      _id
      label
      name
      sl_id
      type
      template
      status
      options
      validation
      placeholder
      icon {
        _id
        src
      }
    }
  }
`;
