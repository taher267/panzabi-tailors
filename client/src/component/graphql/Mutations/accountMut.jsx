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

export const DELETE_ACCOUNT = gql`
  mutation deleteDailyAccount($_id: ID!) {
    deleteDailyAccount(_id: $_id)
  }
`;
