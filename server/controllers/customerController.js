import Customer from '../models/User.js';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import customerValidation from '../validation/customerValidation.js';

export default {
  /**
   * Create New Customer
   */
  createCustomer: async (_parent, { customer }, { req, res }) => {
    try {
      await customerValidation.newCustomerValidation(customer);
      const newCustomerData = customer;
      if (!newCustomerData?.engage?.length) newCustomerData.engage = [];
      const newCustomer = new Customer({
        ...newCustomerData,
        Customer: '63134fc4362a560e956dfc22',
      });
      await newCustomer.save();
      return newCustomer;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * All Customers
   */
  allCustomers: async (_parent, { key, value }, { req, res }) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      const all = await Customer.find(filter);
      let modified = [];
      for (const single of all) {
        let { _id, ...rest } = single._doc;
        modified.push({
          id: _id,
          ...rest,
        });
      }
      return modified;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Single Customer
   */
  getCustomer: async (_parent, { id }, { req, res }) => {
    try {
      if (!mg.isValidObjectId(id))
        throw new UserInputError(`Invalid delete id`);
      return await Customer.findById(id);
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Create New Customer
   */
  updateCustomer: async (_parent, { id, update }, { req, res }) => {
    try {
      const updated = await Customer.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updated;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Delete Customer
   */
  deleteCustomer: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await Customer.deleteOne({ _id });
      console.log(del);
      return del.deletedCount;
    } catch (e) {
      throw new UserInputError(e);
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
