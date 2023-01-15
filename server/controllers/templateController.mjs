import mg from 'mongoose';
import Template from '../models/Template.mjs';
import { UserInputError } from 'apollo-server-core';
import templateValidation from '../validation/templateValidation.mjs';
import errorHandler from '../utils/errorHandler.mjs';
import templateServices from '../services/templateServices.mjs';
import Joi from 'joi';

export default {
  /**
   * Create New design
   */
  createTempate: async (_, { newData }) => {
    try {
      // console.log(newData);
      await templateValidation.newTemplateValidation(newData);
      const data = await templateServices.createTemplate(newData);
      return true;
    } catch (e) {
      // console.log(e);
      throw new UserInputError(`Failed to create template`, {
        ...e.extensions,
        // status: 400,
      });
      // errorHandler(e);
    }
  },
  /**
   * All designs
   */
  allTempates: async (_parent, { key, value }) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      let templates = await templateServices.findTemplate(
        filter,
        null,
        'name templateBody'
      );
      return templates;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Single Tempate
   */
  getTempate: async (_parent, { key, value }, context) => {
    try {
      if (key === '_id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid delete id`);
      const Tempate = await templateServices.findTemplate(key, value);
      return Tempate;
    } catch (e) {
      throw errorHandler(e);
    }
  },
  /**
   * Create New Tempate
   */
  updateTempate: async (_parent, { id, update }, context) => {
    try {
      const updated = await Template.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updated;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Delete Tempate
   */
  deleteTempate: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await Design.deleteOne({ _id });
      console.log(del);
      return del.deletedCount;
    } catch (e) {
      errorHandler(e);
    }
  },
};
