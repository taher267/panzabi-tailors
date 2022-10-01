import Measurement from '../models/Measurement.js';
import errorHandler from '../utils/errorHandler.js';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findMeasurement = (key, value, select = '') => {
  if (key === 'id') return Measurement.findById(value).select(select);
  else if (key && value)
    return Measurement.findOne({ [key]: value }).select(select);
  return Measurement.find(key || {}).select(select);
};

/**
 * @param {|object} qry
 * @param {object} update
 * @param {object} options
 * @returns
 */
const measurementUpdate = async (qry, update, options) => {
  try {
    return await Measurement.updateOne(qry, update, options);
  } catch (e) {
    errorHandler(e);
  }
};

const createMeasurement = async ({ name, sl_id }) => {
  try {
    const newData = { name, sl_id };
    const saved = new Measurement(newData);
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  findMeasurement,
  createMeasurement,
  measurementUpdate,
};
