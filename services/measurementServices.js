import Measurement from '../models/Measurement.js';
import errorHandler from '../utils/errorHandler.js';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findMeasurement = (key, value, select = '', agg) => {
  if (key === '_id') return Measurement.findById(value).select(select);
  else if (key && value)
    return Measurement.findOne({ [key]: value }).select(select);
  // else if (agg)
  //   return Measurement.aggregate([
  //     {
  //       $group: {
  //         _id: 'randomID',
  //         templates: { $template: '$template' },
  //       },
  //     },
  //   ]);
  return Measurement.find(key || {});
  // .select(select);
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

const createMeasurement = async ({
  label,
  name,
  sl_id,
  template,
  status,
  options,
  params,
  validation,
  placeholder,
  icon,
}) => {
  try {
    const newData = {
      label,
      name,
      sl_id,
      template,
      status,
      options,
      params, //multiline→true∂rows→5
      validation,
      placeholder,
      icon,
    };
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
