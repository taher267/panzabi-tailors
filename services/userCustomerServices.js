import User from '../models/User.js';
import errorHandler from '../utils/errorHandler.js';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findUser = (key, value, select = '') => {
  if (key === 'id') return User.findById(value).select(select);
  else if (key === 'single' && value)
    return User.findOne({ [key]: value }).select(select);
  else if (key && value) return User.findOne({ [key]: value }).select(select);
  return User.find(key || {}).select(select);
};

const createUser = async ({ name, username, email, password, phone_no }) => {
  try {
    const newData = { name, username, email, password, phone_no };
    const saved = new User(newData);
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  findUser,
  createUser,
};