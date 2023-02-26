import { gql } from '@apollo/client';

export const NEW_INPUT_FIELD = gql`
  mutation createInputField($fields: InputFields!) {
    createInputField(fields: $fields) {
      fieldGroup
      fields {
        label
        name
        sl_id
        type
        template
        status
        validation
        placeholder
        options
        params
        icon {
          _id
          src
        }
      }
    }
  }
`;

export const EDIT_INPUT_FIELD = gql`
  mutation updateInputField($id: String!, $update: UpdateInputFields) {
    updateInputField(id: $id, update: $update) {
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
