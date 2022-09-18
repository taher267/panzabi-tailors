import { UserInputError } from 'apollo-server-core';
import User from '../models/User.js';
import check from 'validator';
const newCustomerValidation = async ({ phone_no, email }) => {
  let errors = '';
  try {
    // console.log(req.body, phone_no);
    // console.log(phone_no, email);
    if (phone_no.length !== 11) errors = `phone_no:Phone no must be 11 chars!`;
    else if (phone_no.length === 11) {
      const userbyPhone = await User.findOne({ phone_no });
      if (userbyPhone) errors += `phone_no:Phone no already exists!`;
    }
    if (email) {
      if (!check.isEmail(email))
        errors.email(`Invalid email address, ${email}`);
      else if (await User.findOne({ email }))
        errors += `email:Email already exists!`;
    }
    if (!errors.length) return true;
    throw new UserInputError(errors);
  } catch (e) {
    throw new UserInputError(e);
  }
};

export default { newCustomerValidation };
