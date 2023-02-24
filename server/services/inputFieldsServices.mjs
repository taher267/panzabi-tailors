import InputField from '../models/InputField.mjs';
import errorHandler from '../utils/errorHandler.mjs';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findInputFiled = (key, value, select = '', agg) => {
  if (key === '_id') return InputField.findById(value).select(select);
  else if (key && value)
    return InputField.findOne({ [key]: value }).select(select);
  // else if (agg)
  //   return InputField.aggregate([
  //     {
  //       $group: {
  //         _id: 'randomID',
  //         templates: { $template: '$template' },
  //       },
  //     },
  //   ]);
  return InputField.find(key || {}).select(select);
  // .select(select);
};

/**
 * @param {|object} qry
 * @param {object} update
 * @param {object} options
 * @returns
 */
const InputFiledUpdate = async (qry, update, options) => {
  try {
    return await InputField.updateOne(qry, update, options);
  } catch (e) {
    errorHandler(e);
  }
};

const createInputFiled = async ({
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
    const saved = new InputFiled(newData);
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  findInputFiled,
  createInputFiled,
  InputFiledUpdate,
};
