export const Login = `
type Login {
    token: String!
}`;

export const InputSignUp = `
input InputSignUp {
  name: String!
  phone_no: String!
  email: String!
  username: String!
  password: String!
}`;
export const InputLogin = `input InputLogin {
    username: String!
    password: String!
  }`;

export const userLogin = `userLogin(credentials: InputLogin): Login!`;

export const userSignup = `userSignup(register: InputSignUp): Login!`;
