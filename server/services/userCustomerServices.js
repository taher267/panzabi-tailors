import User from '../models/User.js';

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
export default {
  findUser,
};
