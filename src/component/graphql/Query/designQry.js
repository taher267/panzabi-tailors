import { gql } from '@apollo/client';

export const ALL_DESIGNS = gql`
  query allDesigns {
    allDesigns {
      _id
      type
      design_name
      designs {
        item
        ds_id
        _id
        icon {
          _id
          src
        }
      }
    }
  }
`;

export const SPECIFIC_ALL_DESIGNS = gql`
  query allDesigns {
    allDesigns {
      _id
      type
      design_name
      designs {
        item
        # ds_id
        _id
      }
    }
  }
`;

export const SINGLE_DESIGN = gql`
  query getDesign($key: String!, $value: String!) {
    getDesign(key: $key, value: $value) {
      _id
      type
      design_name
      designs {
        item
        ds_id
        _id
        icon {
          _id
          src
        }
      }
    }
  }
`;
