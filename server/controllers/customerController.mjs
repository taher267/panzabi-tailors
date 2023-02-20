import Customer from '../models/User.mjs';
import customerServices from '../services/userCustomerServices.mjs';
import mg from 'mongoose';
import customerValidation from '../validation/customerValidation.mjs';
import errorHandler, { InputErr } from '../utils/errorHandler.mjs';
// import auth from '../auth/auth.mjs';
import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from 'apollo-server';
import userCustomerServices from '../services/userCustomerServices.mjs';
import joiInputErrorsFormater from '../utils/joiInputErrorsFormater.mjs';

export default {
  /**
   * Create New Customer
   */
  createCustomer: async (_parent, { customer }, { req, res, isAuthorized }) => {
    try {
      if (!isAuthorized)
        throw new AuthenticationError(`Unauthorized`, {
          errors: { message: `Unauthorized user` },
        });

      if (!req?.user?.id) throw ApolloError(`Server Error Occered!`);
      const values = await customerValidation.newCustomerValidation(customer);
      const { phone_no, email } = customer;
      const userQry = [{ phone_no }];
      if (email) {
        userQry.push({ email });
      }

      const doesExist = await userCustomerServices.findUser('single', {
        $or: userQry,
      });
      if (doesExist) {
        const errors = {
          phone_no: `Phone no already exists!`,
        };
        if (email) {
          errors.email = `Email or phone already exists!`;
        }
        throw new UserInputError(`Fail to add new customer`, {
          status: 400,
          errors,
        });
      }
      const newCustomer = new Customer({
        ...values,
        user: req?.user?._id || req?.user?.id,
      });
      const saved = await newCustomer.save();
      console.log(newCustomer);
      return newCustomer;
    } catch (e) {
      if (e.isJoi) {
        const errors = joiInputErrorsFormater(e.details);
        return InputErr({
          message: `Fail to create new customer`,
          extensions: {
            status: 400,
            errors,
          },
        });
      } else if (e?.extensions) {
        throw InputErr(e);
      }
      return errorHandler(e);
    }
  },
  /**
   * All Customers
   */
  allCustomers: async (
    _parent,
    { key, value },
    { req, res, currentUser, isAuthorized }
  ) => {
    try {
      // const user = await auth.userAuthorization(req);
      if (!isAuthorized) throw new ApolloError(`Internal server error`);
      const filter =
        key && value
          ? { [key]: { $in: value.split('|') } }
          : { roles: { $in: ['CUSTOMER'] } };
      const all = await customerServices.findCustomer(filter);
      return all;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Single Customer
   */
  getCustomer: async (_parent, { key, value }, { req, res }) => {
    try {
      if (key === '_id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid customer id`);
      const customer = await customerServices.findUser(key, value);
      return customer;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Update Customer
   */
  updateCustomer: async (
    _parent,
    { id, update },
    { req, res, isAuthorized }
  ) => {
    try {
      if (!isAuthorized)
        throw new AuthenticationError(`Unauthorized`, {
          errors: { message: `Unauthorized user` },
        });
      await customerValidation.updateCustomerValidation({ id, ...update });
      const updated = await Customer.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updated;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Delete Customer
   */
  deleteCustomer: async (_parent, { _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Fail to delete the customer!`);
      const del = await Customer.findByIdAndDelete(_id);
      return del.deletedCount;
    } catch (e) {
      return InputErr(e);
    }
  },
};

// Customer.findByIdAndUpdate(
//   '6324efa9255bce344100a4da',
//   {
//     name: 'Abu Taher',
//     phone_no: '01962054585',
//     status: 'ACTIVE',
//     roles: 'rfjdkfjd',
//     email: 'abutaher267@gmail.com',
//     address: 'malia',
//     order_status: 'PROCESSING',
//     delivery_detail: {
//       delivery_by: 'SA Paribabon',
//       delivery_charge: 120.0,
//       location: 'Malia',
//       delivery_phone: '01962054585',
//     },
//   },
//   { new: true }
// )
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
// Customer.create({
//   name: 'Abu Taher',
//   phone_no: '01962054585',
//   email: 'supremetaher@gmail.com',
//   address: 'malia',
//   Customer: '6324efa9255bce344100a4da',
//   delivery_detail: {
//     delivery_by: 'SA Paribabon',
//     delivery_charge: 120.0,
//     location: 'Malia',
//     delivery_phone: '01962054585',
//   },
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
