import { gql } from '@apollo/client';

export const NEW_MEASUREMENT = gql`
  type InpIcon {
    id: String
    src: String
  }
  mutation createMeasurement($sl_id: String!, $name: String!, $icon: InpIcon) {
    createMeasurement(measures: { sl_id: $sl_id, name: $name, icon: $icon }) {
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
