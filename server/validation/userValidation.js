import { UserInputError } from 'apollo-server-core';
import userServices from '../services/userCustomerServices.js';
import check from 'validator';
const newUserValidation = async ({
  name,
  phone_no,
  email,
  username,
  password,
}) => {
  let errors = {};
  try {
    //phone
    if (phone_no?.length !== 11) errors.phone_no = `Phone no must be 11 chars!`;
    else if (phone_no?.length === 11) {
      const userbyPhone = await userServices.findUser('phone_no', phone_no);
      if (userbyPhone) errors.phone_no += `phone_no:Phone no already exists!`;
    }

    //name
    if (name?.trim()?.length < 4) errors = `Name must be at least 4 chars!`;
    // email
    if (!email) errors.email = `Email is mandatory!`;
    else if (!check.isEmail(email))
      errors.email = `Invalid email address, ${email}`;
    else if (await userServices.findUser('email', email))
      errors.email = `Email already exists!`;
    //username
    if (!username) errors.username = `Username is mandatory!`;
    else if (username?.length < 5)
      errors.username = `Username at least 5 chars, ${username}`;
    else if (await userServices.findUser('username', username))
      errors.username = `Username already exists!`;
    // Password
    if (password) {
      if (password?.length < 8)
        errors.password = `password at least 8 chars, ${password}`;
    }
    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `A number's of error cought ${Object.keys(errors).join(', ')}`,
      { errors }
    );
  } catch (e) {
    throw new UserInputError(e);
  }
};
// const newUserValidation = async ({
//   name,
//   phone_no,
//   email,
//   username,
//   password,
// }) => {
//   let errors = '';
//   try {
//     //phone
//     if (phone_no?.length !== 11) errors = `phone_no:Phone no must be 11 chars!`;
//     else if (phone_no?.length === 11) {
//       const userbyPhone = await userServices.findUser('phone_no', phone_no);
//       if (userbyPhone) errors += `phone_no:Phone no already exists!`;
//     }

//     //name
//     if (name?.trim()?.length < 4)
//       errors = `name:Name must be at least 4 chars!`;
//     // email
//     if (!email) errors += `email:Email is mandatory!`;
//     else if (!check.isEmail(email))
//       errors += `email:Invalid email address, ${email}`;
//     else if (await userServices.findUser('email', email))
//       errors += `email:Email already exists!`;
//     //username
//     if (!username) errors += `username:Username is mandatory!`;
//     else if (username?.length < 5)
//       errors += `username:Username at least 5 chars, ${username}`;
//     else if (await userServices.findUser('username', username))
//       errors += `username:Username already exists!`;
//     // Password
//     if (password) {
//       if (password?.length < 8)
//         errors += `password:password at least 8 chars, ${password}`;
//     }
//     // error throw
//     if (!errors.length) return true;
//     throw new UserInputError(errors);
//   } catch (e) {
//     throw new UserInputError(e);
//   }
// };
export default { newUserValidation };
