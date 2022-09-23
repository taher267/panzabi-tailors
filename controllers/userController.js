import User from '../models/User.js';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import userValidation from '../validation/userValidation.js';
import { hash, genSalt } from 'bcrypt';

import userServices from '../services/userCustomerServices.js';
import getJWT from '../utils/getJWT.js';
import errorHandler from '../utils/errorHandler.js';
export default {
  /**
   * Create New User
   */
  createUser: async (_parent, { user }, { req, res }) => {
    try {
      await userValidation.newUserValidation(user);
      const newUserData = user;
      if (user?.password) {
        user.password = await hash(user.password, await genSalt(10));
      }
      if (!user?.roles?.length) newUserData.roles = ['USER'];
      if (!newUserData?.engage?.length) newUserData.engage = [];
      const newUser = new User({
        ...newUserData,
      });
      const saved = await newUser.save();

      // return saved;
      const token = getJWT(saved.id);
      // console.log(saved, token);
      return {
        ...saved._doc,
        id: saved.id,
        token,
      };
    } catch (e) {
      return errorHandler(e);
    }
  },
  /**
   * All Users
   */
  allUsers: async (_parent, { key, value }, { req, res }) => {
    try {
      const filter =
        key && value
          ? { [key]: { $in: value.split('|') } }
          : { roles: { $in: ['USER'] } };
      const all = await userServices.findUser(filter);
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
  getUser: async (parent, { key, value }, { req, res }) => {
    try {
      // console.log(parent);
      if (!key || !value)
        throw new UserInputError(`key and value must be provide!`);
      if (key === 'id' && !mg.isValidObjectId(value))
        throw new UserInputError(`valid id`, {
          errors: {
            id: `Please provide a valid id!`,
          },
        });
      return await userServices.findUser(key, value);
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
