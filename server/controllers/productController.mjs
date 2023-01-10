import Product from '../models/Product.mjs';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server';
import productValidation from '../validation/productValidation.mjs';
import productServices from '../services/productServices.mjs';
import errorHandler from '../utils/errorHandler.mjs';
export default {
  /**
   * Create New Product
   */

  createProduct: async (_parent, { product }, _context) => {
    try {
      await productValidation.newProductValidation(product);
      const created = await productServices.createProduct(product);
      return created;
    } catch (e) {
      return errorHandler(e);
    }
  },
  /**
   * All Products
   */
  allProducts: async (_parent, { key, value }, _context) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      return await productServices.findProduct(filter);
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Single Product
   */
  getProduct: async (_parent, { _id }, _context) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete _id`);
      return await productServices.findProduct('_id', _id);
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Create New Product
   */
  updateProduct: async (_parent, { _id, update }, _context) => {
    try {
      await productValidation.updateProductValidation({ _id, ...update });
      const updated = await productServices.updateProduct(_id, update);
      return updated;
    } catch (e) {
      errorHandler(e);
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
      errorHandler(e);
    }
  },
};
