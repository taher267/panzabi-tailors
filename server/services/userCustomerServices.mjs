import User from '../models/User.mjs';
import errorHandler from '../utils/errorHandler.mjs';

// User.find()
//   .populate('orders')
//   // .select('orders')
//   .then((d) => {
//     for (const it of d) {
//       console.log(it.user);
//     }
//   })
//   .catch((e) => console.log(e));

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findUser = (key, value, select = '') => {
  console.log(key, value);
  if (key === '_id') return User.findById(value).select(select);
  else if (key === 'single' && value) return User.findOne(value).select(select);
  else if (key && value) return User.findOne({ [key]: value }).select(select);
  return User.find(key || {}).select(select);
};

const findUser2 = (value) => {
  return User.find(value).populate('orders');
};

const findUserPopulate = (key, value, select = '') => {
  console.log(key, value);
  if (key === '_id') return User.findById(value).select(select);
  else if (key === 'single' && value) return User.findOne(value).select(select);
  else if (key && value) return User.findOne({ [key]: value }).select(select);
  return User.find(key || {}).select(select);
};

const createUser = async ({ name, username, email, password, phone_no }) => {
  try {
    const newData = { name, username, password, email, phone_no };
    const saved = new User(newData);
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};

const customerOrderIDUpdate = async (customer, updateData, options = {}) => {
  try {
    console.log(updateData);
    const updated = await User.findByIdAndUpdate(customer, updateData, options);
    return updated;
  } catch (e) {
    errorHandler(e);
  }
};

const customerUpdate = async (customer, id) => {
  try {
    const updated = await User.findByIdAndUpdate(
      customer,
      { $push: { orders: id } },
      { upsert: true }
    );
    return updated;
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  customerOrderIDUpdate,
  findUser,
  createUser,
  findUserPopulate,
  findUser2,
};
