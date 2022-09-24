import { gql } from '@apollo/client';

export const NEW_MEASUREMENT = gql`
  # input InpIcon {
  #   id: String
  #   src: String
  # }

  mutation createMeasurement(
    $sl_id: String!
    $name: String! # $icon: InpIcon
  ) {
    createMeasurement(measures: { sl_id: $sl_id, name: $name }) {
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

export const EDIT_MEASUREMENT = gql`
  # input InpIcon {
  #   id: String
  #   src: String
  # }

  mutation updateMeasurement(
    $id: String!
    $name: String!
    $sl_id: String! # $icon: InpIcon
  ) {
    updateMeasurement(id: $id, update: { name: $name, sl_id: $sl_id }) {
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
