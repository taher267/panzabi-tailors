import { gql } from '@apollo/client';

export const NEW_ACCOUNT = gql`
  mutation createDailyAccount($account: InputDailyAccount) {
    createDailyAccount(account: $account) {
      _id
      date
      purpose
      type
      cash_in
      cash_out
      name
      comment
    }
  }
`;
// {
//   date: $date
//   purpose: $purpose
//   type: $type
//   cash_in: $cash_in
//   cash_out: $cash_out
//   name: $name
//   comment: $comment
// }
// $date: String!
// $purpose: String!
// $type: String!
// $cash_in: Float
// $cash_out: Float
// $name: String!
// $comment: String

export const EDIT_ACCOUNT = gql`
  mutation updateDailyAccount($_id: ID!, $update: InputDailyAccount) {
    updateDailyAccount(_id: $_id, update: $update) {
      _id
      date
      purpose
      type
      cash_in
      cash_out
      name
      comment
    }
  }
`;
