import { gql } from 'apollo-server-core';
const InputCommon = `
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
    `;
export default gql`
  type FieldsItem {
    _id: ID!
   ${InputCommon}
   icon:Icon
  }

  input InputFieldsItem {
   ${InputCommon}
   icon: InpIcon
  }
  
  input InputFieldsItemDragAndDrop {
    _id:ID!
   ${InputCommon}
   icon: InpIcon
  }
  input InputFields {
    fieldGroup: String!
    existingGroup: String
    fields: [InputFieldsItem!]!
  }
  type Field {
    _id: ID!
    fieldGroup: String!
    fields: [FieldsItem!]!
  }

  type Query {
    allFields(key: String, value: String, options: String): [Field!]!
    getInputField(key: String!, value: String!): Field!
  }
  type Mutation {
    createInputField(fields: InputFields!): Field!
    inputGroupFieldsSync(id: ID!, source: Int!, destination: Int!): Boolean!
    # updateField(id: String!, update: InputField): Field
    # deleteField(id: ID!): Boolean
  }
`;
