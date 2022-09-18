import { gql } from '@apollo/client';

export const ALL_MEASUREMENTS = gql`
  mutation allMeasurements()
  {
    allMeasurements{
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
