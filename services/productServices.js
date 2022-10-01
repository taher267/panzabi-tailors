import Product from '../models/Product.js';
import errorHandler from '../utils/errorHandler.js';

// Product.findOne({
//   $or: [
//     { username: '01765470147' },
//     { phone_no: '01765470147' },
//     { email: '01765470147' },
//   ],
// })
//   .select('password roles')
// .then((d) => console.log(d))
// .catch((e) => console.log(e));
/**
 *
 * @param {string||object} key
 * @param {string||object} value
 * @returns
 */
const findProduct = (key, value, select = '') => {
  if (key === '_id') return Product.findById(value).select(select);
  else if (key && value)
    return Product.findOne({ [key]: value }).select(select);
  return Product.find(key || {}).select(select);
};

const createProduct = async ({ name, category, price, description }) => {
  try {
    const newData = { name, category, price, description };
    const newProduct = new Product(newData);
    return await newProduct.save();
  } catch (e) {
    errorHandler(e);
  }
};

const updateProduct = async (
  key,
  { name, category, price, description },
  options
) => {
  try {
    const updateData = { name, category, price, description };
    if (typeof key === 'string') {
      return await Product.findByIdAndUpdate(
        key,
        updateData,
        options || { new: true }
      );
    }
    return await Product.updateOne(key, updateData, options || {});
  } catch (e) {
    errorHandler(e);
  }
};
export default {
  findProduct,
  createProduct,
  updateProduct,
};
