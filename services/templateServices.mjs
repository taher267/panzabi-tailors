import Template from '../models/Template.mjs';
import errorHandler from '../utils/errorHandler.mjs';

// Template.find()
//   .then((d) => console.log(d))
//   .catch((d) => console.log(d));
/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findTemplate = (key, value, select = '') => {
  if (key === '_id') return Template.findById(value).select(select);
  else if (key && value)
    return Template.findOne({ [key]: value }).select(select);
  return Template.find(key || {}).select(select);
};

/**
 * @param {string|object} qry
 * @param {object} update
 * @param {object} options
 * @returns
 */
const templateUpdate = async (qry, update, options) => {
  try {
    return await Template.updateOne(qry, update, options);
  } catch (e) {
    errorHandler(e);
  }
};

const createTemplate = async (data) => {
  try {
    // const newData = { template_name, type, templates };
    const saved = new Template(data);
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  findTemplate,
  createTemplate,
  templateUpdate,
};
