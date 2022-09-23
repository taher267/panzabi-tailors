import { UserInputError } from 'apollo-server';
import isEmail from 'validator/lib/isemail.js';
import errorHandler from '../utils/errorHandler.js';
const authValidation = async ({ username, password }) => {
  let errors = {};
  try {
    //username
    if (!username) errors.username = `Username is mandatory!`;
    else if (username.includes('@') && !isEmail(username))
      errors.username = `Invalid username`;
    else if (username.length < 5) errors.username = `Invalid username`;
    // Password
    if (!password) errors.password = `Password is mandatory!`;
    else if (password?.length < 8) errors.password = `Invalid password`;
    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `A number's of error cought ${Object.keys(errors).join(', ')}`,
      { errors: errors }
    );
  } catch (e) {
    errorHandler(e);
  }
};
export default { authValidation };

// let text = `fjdkjdkfd`;
// console.log(text.includes('@'));
