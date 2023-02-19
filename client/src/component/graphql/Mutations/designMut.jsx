import { gql } from '@apollo/client';
export const NEW_DESIGN = gql`
  mutation createDesign(
    $design_name: String!
    $designs: [InpDesignItem!]!
    $type: [String!]!
  ) {
    createDesign(
      design: { design_name: $design_name, designs: $designs, type: $type }
    ) {
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

export const EDIT_DESIGN = gql`
  mutation updateDesign($_id: ID!, $update: InputDisign!) {
    updateDesign(_id: $_id, update: $update) {
      _id
      type
      design_name
      designs {
        item
        ds_id
        icon {
          _id
          src
        }
      }
    }
  }
`;
