import User from '../models/User.js';
import mg from 'mongoose';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';

export default {
  /**
   * Create New User
   */
  createUser: catchAsyncErrors(async (_parent, { user }, { req, res }) => {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }),
  /**
   * All Users
   */
  allUsers: catchAsyncErrors(async (_parent, { key, value }, { req, res }) => {
    const filter = key && value ? { [key]: value } : {};
    return await User.find(filter);
  }),
  /**
   * Single User
   */
  getUser: catchAsyncErrors(async (_parent, { id }, { req, res }) => {
    if (!mg.isValidObjectId(id)) throw new UserInputError(`Invalid delete id`);
    return await User.findById(id);
  }),
  /**
   * Create New User
   */
  updateUser: catchAsyncErrors(
    async (_parent, { id, update }, { req, res }) => {
      const updated = await User.findByIdAndUpdate(id, update, { new: true });
      return updated;
    }
  ),
  /**
   * Delete User
   */
  deleteUser: catchAsyncErrors(async (_parent, { id: _id }) => {
    if (!mg.isValidObjectId(_id)) throw new UserInputError(`Invalid delete id`);
    const del = await User.deleteOne({ _id });
    console.log(del);
    return del.deletedCount;
  }),
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
