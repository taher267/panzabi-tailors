import { gql } from 'apollo-server-core';

export default gql`
  type FieldsItem {
    _id: ID!
    label: String!
    name: String!
    type: String
    sl_id: String!
    template: String!
    status: String!
    options: [String]
    params: String
    validation: String
    placeholder: String
    icon: Icon
  }

  input InputFieldsItem {
    label: String!
    name: String!
    sl_id: String!
    type: String
    template: String!
    status: String!
    validation: String
    placeholder: String
    options: [String]
    params: String
    icon: InpIcon
  }

  input InputFields {
    fieldGroup: String!
    fields: [InputFieldsItem!]!
  }

  type Field {
    fieldGroup: String!
    fields: [FieldsItem!]!
  }

  # type Query {
  #   allFields(key: String, value: String, options: String): [Fields!]!
  #   getField(key: String!, value: String!): Field!
  # }
  type Mutation {
    createField(fields: InputFields!): Field!
    # updateField(id: String!, update: InputField): Field
    # deleteField(id: ID!): Boolean
  }
`;
