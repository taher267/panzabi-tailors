import { gql } from '@apollo/client';

export const NEW_MEASUREMENT = gql`
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
  mutation updateMeasurement(
    $id: String!
    $update: InputMeasurement # $name: String! # $sl_id: String! # $icon: InpIcon
  ) {
    updateMeasurement(id: $id, update: $update) {
      #  { name: $name, sl_id: $sl_id }
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
