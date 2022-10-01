import { gql } from '@apollo/client';

export const ALL_ACCOUNTS = gql`
  query allAccounts {
    allAccounts {
      _id
      name
      date
      purpose
      type
      cash_in
      cash_out
      comment
      createdAt
      updatedAt
    }
  }
`;

export const DAILY_ACCOUNT = gql`
  query dailyAccount($key: String!, $value: String!) {
    getDailyAccount(key: $key, value: $value) {
      _id
      name
      date
      purpose
      type
      cash_in
      cash_out
      comment
    }
  }
`;
