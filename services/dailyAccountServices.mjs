import DailyAccount from '../models/DailyAccount.mjs';
import errorHandler from '../utils/errorHandler.mjs';

/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findDailyAccount = (key, value, select = '') => {
  if (key === '_id') return DailyAccount.findById(value).select(select);
  else if (key && value)
    return DailyAccount.findOne({ [key]: value }).select(select);
  return DailyAccount.find(key || {}).select(select);
};

/**
 * @param {string|object} qry
 * @param {object} update
 * @param {object} options
 * @returns
 */
const dailyAccountUpdate = async (qry, update, options) => {
  try {
    if (typeof qry === 'string') {
      return await DailyAccount.findByIdAndUpdate(qry, update, options);
    }
    return await DailyAccount.updateOne(qry, update, options);
  } catch (e) {
    errorHandler(e);
  }
};

const createDailyAccount = async ({
  date,
  purpose,
  type,
  cash_in,
  cash_out,
  name,
  comment,
}) => {
  try {
    const newData = { date, purpose, type, cash_in, cash_out, name, comment };
    const saved = new DailyAccount(newData);
    return await saved.save();
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  findDailyAccount,
  createDailyAccount,
  dailyAccountUpdate,
};
