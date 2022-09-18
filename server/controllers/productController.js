import Product from '../models/Product.js';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';

export default {
  /**
   * Create New Product
   */
  createProduct: async (_parent, { product }, _context) => {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      return newProduct;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * All Products
   */
  allProducts: async (_parent, { key, value }, _context) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      return await Product.find(filter);
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Single Product
   */
  getProduct: async (_parent, { id }, _context) => {
    try {
      if (!mg.isValidObjectId(id))
        throw new UserInputError(`Invalid delete id`);
      return await Product.findById(id);
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Create New Product
   */
  updateProduct: async (_parent, { id, update }, _context) => {
    try {
      const updated = await Product.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updated;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Delete Product
   */
  deleteProduct: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await Product.deleteOne({ _id });
      return del.deletedCount;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
};
