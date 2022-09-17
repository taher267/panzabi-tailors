import Product from '../models/Product.js';
import mg from 'mongoose';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';

export default {
  /**
   * Create New Product
   */
  createProduct: catchAsyncErrors(async (_parent, { product }, _context) => {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
  }),
  /**
   * All Products
   */
  allProducts: catchAsyncErrors(async (_parent, { key, value }, _context) => {
    const filter = key && value ? { [key]: value } : {};
    return await Product.find(filter);
  }),
  /**
   * Single Product
   */
  getProduct: catchAsyncErrors(async (_parent, { id }, _context) => {
    if (!mg.isValidObjectId(id)) throw new UserInputError(`Invalid delete id`);
    return await Product.findById(id);
  }),
  /**
   * Create New Product
   */
  updateProduct: catchAsyncErrors(async (_parent, { id, update }, _context) => {
    const updated = await Product.findByIdAndUpdate(id, update, { new: true });
    return updated;
  }),
  /**
   * Delete Product
   */
  deleteProduct: catchAsyncErrors(async (_parent, { id: _id }) => {
    if (!mg.isValidObjectId(_id)) throw new UserInputError(`Invalid delete id`);
    const del = await Product.deleteOne({ _id });
    console.log(del);
    return del.deletedCount;
  }),
};
