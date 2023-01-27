import { UserInputError } from 'apollo-server';
import Order from '../models/Order.mjs';
import errorHandler from '../utils/errorHandler.mjs';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */

const findOrder = (key, value, select = '') => {
  if (key === '_id') return Order.findById(value).select(select);
  else if (key && value) return Order.findOne({ [key]: value }).select(select);
  else if (typeof key === 'object') {
    return Order.find(key || {}).select(select);
  }
  return null;
};

/**
 * @param {string|object} qry
 * @param {object} update
 * @param {object} options
 * @returns
 */

const orderUpdate = async (qry, update, options) => {
  try {
    return await Order.updateOne(qry, update, options);
  } catch (e) {
    errorHandler(e);
  }
};

const newOrder = async (data) => {
  try {
    const newData = { ...data };
    const saved = new Order(newData);
    // return saved;
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};

const orderDelete = async (key, value) => {
  try {
    if (!key || !value) {
      throw new UserInputError(`Invalid data!`, {
        errors: { message: `Doesn't able to delete this!` },
      });
    }
    if (key === '_id') return await Order.findByIdAndDelete(value);
    return await User.deleteOne({ [key]: value });
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  newOrder,
  findOrder,
  orderUpdate,
  orderDelete,
};
