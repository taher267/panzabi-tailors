import Design from '../models/Design.mjs';
import errorHandler from '../utils/errorHandler.mjs';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findDesign = (key, value, select = '') => {
  if (key === '_id') return Design.findById(value).select(select);
  else if (key && value) return Design.findOne({ [key]: value }).select(select);
  return Design.find(key || {}).select(select);
};

/**
 * @param {string|object} qry
 * @param {object} update
 * @param {object} options
 * @returns
 */
const designUpdate = async (qry, update, options) => {
  try {
    return await Design.updateOne(qry, update, options);
  } catch (e) {
    errorHandler(e);
  }
};

const createDesign = async ({ design_name, type, designs }) => {
  try {
    const newData = { design_name, type, designs };
    const saved = new Design(newData);
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  findDesign,
  createDesign,
  designUpdate,
};
