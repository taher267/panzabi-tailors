import InputField from '../models/InputField.mjs';
import mg from 'mongoose';
import { AuthenticationError, UserInputError } from 'apollo-server';
import inputFieldsValidation from '../validation/inputFieldsValidation.mjs';
import errorHandler from '../utils/errorHandler.mjs';
import inputFieldsServices from '../services/inputFieldsServices.mjs';
import stringToQryString from '../utils/stringToQryString.mjs';

export default {
  /**
   * Create New InputField
   */
  createInputField: async (_parent, { fields }, _context) => {
    try {
      const values = await inputFieldsValidation.inputFieldsValidation(fields);
      const newInputField = await inputFieldsServices.createInputFiled(values);
      return newInputField;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * All InputFields
   */
  allInputFields: async (_parent, { key, value }, _context) => {
    try {
      let filter = key && value ? { [key]: value } : {};
      if (key && !value) {
        filter = stringToQryString(key);
      }
      const all = await InputField.find(filter);
      // console.log(all);
      return all;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Single InputField
   */
  getInputField: async (_parent, { key, value }, { isAuthorized }) => {
    try {
      if (!isAuthorized) throw AuthenticationError(`Unauthorized user!`);
      if (key === '_id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid id, get ${value}`);
      return await inputFieldsServices.findInputField(key, value);
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Create New InputField
   */
  updateInputField: async (_parent, { id, update }, _context) => {
    try {
      await inputFieldsValidation.inputFieldsUpdateValidation({
        id,
        ...update,
      });
      const updated = await inputFieldsServices.InputFiledUpdate(
        { _id: id },
        update,
        {
          new: true,
        }
      );
      return {
        ...update,
        _id: id,
      };
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Delete InputField
   */
  deleteInputField: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await InputField.deleteOne({ _id });
      console.log(del);
      return del.deletedCount;
    } catch (e) {
      errorHandler(e);
    }
  },
};
