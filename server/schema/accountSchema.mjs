export const DailyAccount = `
type DailyAccount {
  _id: ID!
  name: String!
  date: Date!
  purpose: String!
  type: String!
  cash_in: Float
  cash_out: Float
  comment: String
  createdAt:DateTime!
  updatedAt:DateTime!
}`;
export const InputDailyAccount = `
input InputDailyAccount {
  name: String!
  date: Date!
  purpose: String!
  type: String!
  cash_in: Float
  cash_out: Float
  comment: String
}`;
export const dailyAccountQueries = `
allAccounts(key: String, value: String): [DailyAccount!]!
getDailyAccount(key: String!, value:String!): DailyAccount!
`;

export const dailyAccountMutations = `
createDailyAccount(account: InputDailyAccount): DailyAccount
updateDailyAccount(_id: ID!, update: InputDailyAccount): DailyAccount
deleteDailyAccount(_id: ID!): Boolean`;
