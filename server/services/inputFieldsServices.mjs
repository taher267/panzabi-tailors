import InputField from '../models/InputField.mjs';
import errorHandler from '../utils/errorHandler.mjs';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findInputFiled = (key, value, select = '') => {
  if (key === '_id') return InputField.findById(value).select(select);
  else if (key === 'single' && value)
    return InputField.findOne(value).select(select).exec();
  return InputField.find(key || {})
    .select(select)
    .exec();
};

/**
 * @param {|object} qry
 * @param {object} update
 * @param {object} options
 * @returns
 */
const InputFiledUpdate = async (qry, update, options) =>
  InputField.updateOne(qry, update, options);

const createInputFiled = (newData) => InputField.create(newData);
export default {
  findInputFiled,
  createInputFiled,
  InputFiledUpdate,
};
