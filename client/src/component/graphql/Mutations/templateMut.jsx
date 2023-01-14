import { gql } from '@apollo/client';

export const NEW_TEMPLATE = gql`
  mutation createTemplate($template: InputsTempate!) {
    createTemplate(newData: $template)
  }
`;

export const EDIT_TEMPLATE = gql`
  mutation updateTemplate(
    $id: String!
    $update: InputMeasurement # $name: String! # $sl_id: String! # $icon: InpIcon
  ) {
    updateTemplate(id: $id, update: $update) {
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
