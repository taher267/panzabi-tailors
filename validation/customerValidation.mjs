import { UserInputError } from 'apollo-server';
import check from 'validator';
import customerServices from '../services/userCustomerServices.mjs';
import errorHandler from '../utils/errorHandler.mjs';

const newCustomerValidation = async ({ name, phone_no, email }) => {
  let errors = {};
  try {
    //name
    if (name?.trim()?.length < 4)
      errors.name = `Name must be at least 4 chars!`;
    // email
    if (email) {
      if (!check.isEmail(email))
        errors.email = `Invalid email address, ${email}`;
      else if (await customerServices.findUser('email', email))
        errors.email = `Email already exists!`;
    }
    //phone
    if (phone_no?.length !== 11) errors.phone_no = `Phone no must be 11 chars!`;
    else if (phone_no?.length === 11) {
      const userbyPhone = await customerServices.findUser('phone_no', phone_no);
      if (userbyPhone) errors.phone_no = `Phone no already exists!`;
    }
    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `Request data errors on ${Object.keys(errors).join(', ')}`,
      {
        errors,
      }
    );
  } catch (e) {
    errorHandler(e);
  }
};

const updateCustomerValidation = async ({ id, name, phone_no, email }) => {
  let errors = {};
  try {
    //name
    if (name?.trim()?.length < 4)
      errors.name = `Name must be at least 4 chars!`;
    // email
    if (email) {
      if (!check.isEmail(email))
        errors.email = `Invalid email address, ${email}`;
      else {
        let check = await customerServices.findUser('email', email);
        if (check && check.id !== id) errors.email = `Email already exists!`;
      }
    }
    //phone
    if (phone_no?.length !== 11) errors.phone_no = `Phone no must be 11 chars!`;
    else if (phone_no?.length === 11) {
      const check = await customerServices.findUser('phone_no', phone_no);
      if (check && check.id !== id)
        errors.phone_no = `Phone no already exists!`;
    }
    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `Request data errors on ${Object.keys(errors).join(', ')}`,
      {
        errors,
      }
    );
  } catch (e) {
    errorHandler(e);
  }
};

export default { newCustomerValidation, updateCustomerValidation };