import { UserInputError } from 'apollo-server-core';
import userServices from '../services/userCustomerServices.mjs';
import check from 'validator';
import errorHandler from '../utils/errorHandler.mjs';
const newUserValidation = async ({
  name,
  phone_no,
  email,
  username,
  password,
  passwordCheck,
}) => {
  let errors = {};
  try {
    //name
    if (!name?.trim()) errors.name = `Name is mandatory!`;
    else if (name?.trim()?.length < 4)
      errors.name = `Name must be at least 4 chars!`;
    //phone
    if (!phone_no?.trim()) errors.phone_no = `Phone number is mandatory!`;
    else if (phone_no?.length !== 11)
      errors.phone_no = `Phone number must be 11 chars!`;
    else if (phone_no?.length === 11) {
      const userbyPhone = await userServices.findUser('phone_no', phone_no);
      if (userbyPhone) errors.phone_no = `Phone no. already exists!`;
    }

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
    if (passwordCheck) {
      if (!password) errors.password = `Password Mandatory`;
      else if (password?.length < 8)
        errors.password = `password at least 8 chars`;
    } else if (password && password?.length < 8)
      errors.password = `password at least 8 chars`;
    // error throw
    if (!Object.keys(errors).length) return true;

    throw new UserInputError(
      `A number's of error cought ${Object.keys(errors).join(', ')}`,
      { errors }
    );
  } catch (e) {
    return errorHandler(e);
  }
};

export default { newUserValidation };
