import User from '../models/User.js';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import customerValidation from '../validation/customerValidation.js';

export default {
  /**
   * Create New User
   */
  createUser: async (_parent, { user }, { req, res }) => {
    try {
      await customerValidation.newCustomerValidation(user);
      const newUserData = user;
      if (!newUserData?.engage?.length) newUserData.engage = [];
      const newUser = new User({
        ...newUserData,
        user: '63134fc4362a560e956dfc22',
      });
      await newUser.save();
      return newUser;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * All Users
   */
  allUsers: async (_parent, { key, value }, { req, res }) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      const all = await User.find(filter);
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
   * Single User
   */
  getUser: async (_parent, { id }, { req, res }) => {
    try {
      if (!mg.isValidObjectId(id))
        throw new UserInputError(`Invalid delete id`);
      return await User.findById(id);
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Create New User
   */
  updateUser: async (_parent, { id, update }, { req, res }) => {
    try {
      const updated = await User.findByIdAndUpdate(id, update, { new: true });
      return updated;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Delete User
   */
  deleteUser: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await User.deleteOne({ _id });
      console.log(del);
      return del.deletedCount;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
};

// User.findByIdAndUpdate(
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
// User.create({
//   name: 'Abu Taher',
//   phone_no: '01962054585',
//   email: 'supremetaher@gmail.com',
//   address: 'malia',
//   user: '6324efa9255bce344100a4da',
//   delivery_detail: {
//     delivery_by: 'SA Paribabon',
//     delivery_charge: 120.0,
//     location: 'Malia',
//     delivery_phone: '01962054585',
//   },
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
