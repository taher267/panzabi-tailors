import InputField from '../models/InputField.mjs';
import mg, { isValidObjectId } from 'mongoose';
import { AuthenticationError, UserInputError } from 'apollo-server';
import inputFieldsValidation from '../validation/inputFieldsValidation.mjs';
import errorHandler, { InputErr } from '../utils/errorHandler.mjs';
import inputFieldsServices from '../services/inputFieldsServices.mjs';
import stringToQryString from '../utils/stringToQryString.mjs';
import joiInputErrorsFormater from '../utils/joiInputErrorsFormater.mjs';
import isJsonString from '../utils/isJsonString.mjs';

export default {
  /**
   * Create New InputField
   */
  createInputField: async (_parent, { fields }, _context) => {
    try {
      const values = await inputFieldsValidation.inputFieldsValidation(fields);
      const { fieldGroup, existingGroup } = values;
      let qry = ['single', { fieldGroup }];
      if (existingGroup && !isValidObjectId(existingGroup))
        throw new UserInputError(`Fail to add existing field group`, {
          status: 400,
          errors: {
            existingGroup: `Invalid existing group id!`,
          },
        });
      else if (existingGroup) {
        qry = ['_id', existingGroup];
      }
      let doesExist = await inputFieldsServices.findInputFiled(...qry, '-__v');

      if (!existingGroup && doesExist)
        throw new UserInputError(`Fail to create or add fields`, {
          status: 400,
          errors: {
            fieldGroup: `Field group already exists!`,
          },
        });
      else if (existingGroup && !doesExist)
        throw new UserInputError(`Fail to create or add fields`, {
          status: 404,
          errors: {
            existingGroup: `existing Group doesn't exists!`,
          },
        });
      if (existingGroup) {
        let prevData = JSON.parse(JSON.stringify(doesExist._doc));
        const { _id, ...restPrevData } = prevData;
        let allFields = [...restPrevData.fields, ...values.fields];
        allFields = allFields.map((item) => {
          if (!item?.options?.length) delete item?.options;
          if (!item?.type) item.type = 'text';
          if (!item?._id) item._id = mg.Types.ObjectId().toString();
          return item;
        });
        restPrevData.fields = allFields;
        await inputFieldsValidation.inputFieldsValidation(restPrevData);
        doesExist.fields = allFields;
        return await doesExist.save();
      }
      const newInputField = await inputFieldsServices.createInputFiled(values);
      return newInputField;
    } catch (e) {
      if (e?.isJoi) {
        // console.log(JSON.stringify(e?.details));
        // console.log(e?.details);
        const errors = joiInputErrorsFormater(e?.details);
        return InputErr({
          message: `Fail to Create input Fields!`,
          extensions: {
            status: 400,
            errors,
          },
        });
      } else if (e?.extensions) {
        return InputErr(e);
      }
      errorHandler(e);
    }
  },
  /**
   * All InputFields
   */
  allInputFields: async (_parent, { key, value }, _context) => {
    try {
      let qry = {};
      if (key === 'in' && isJsonString(value)) {
        qry = JSON.parse(value);
      } else if (key && value) {
        qry = { [key]: value };
      }

      const all = await inputFieldsServices.findInputFiled(qry);
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
      let qry = [];
      if (key === '_id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid id, get ${value}`);
      if (key === '_id') {
        qry = ['_id', value];
      }
      return await inputFieldsServices.findInputFiled(...qry);
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
   * Input group fields sync
   */
  inputGroupFieldsSync: async (
    _parent,
    { id, source, destination },
    _context
  ) => {
    try {
      if (!mg.isValidObjectId(id))
        throw new UserInputError(`Fail to sync group fields`, {
          status: 400,
          message: `Invalid sync id!`,
        });

      let doesExist = await inputFieldsServices.findInputFiled('_id', id);

      if (!doesExist)
        throw new UserInputError(`Fail to sync input group fields`, {
          status: 404,
          message: `Input group fields doesn't exists!`,
        });

      const tasks = [...doesExist._doc.fields];
      const [reOrderedItem] = tasks.splice(source, 1);
      tasks.splice(destination, 0, reOrderedItem);
      doesExist.fields = tasks;
      await doesExist.save();
      // console.log(tasks);
      return true;
    } catch (e) {
      if (e?.extensions) {
        return InputErr(e);
      }
      errorHandler(e);
    }
  },
  /** inputGroupFieldsSync2: async (_parent, { _id, fields }, _context) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Fail to sync group fields`, {
          status: 400,
          message: `Invalid sync id!`,
        });
      const values = await inputFieldsValidation.inputFieldsSyncValidation(
        fields
      );

      let doesExist = await inputFieldsServices.findInputFiled(
        '_id',
        _id,
        '-__v'
      );

      if (!doesExist)
        throw new UserInputError(`Fail to sync input group fields`, {
          status: 404,
          message: `Input group fields doesn't exists!`,
        });

      doesExist.fields = values;
      return await doesExist.save();
    } catch (e) {
      if (e?.isJoi) {
        // console.log(JSON.stringify(e?.details));
        // console.log(e?.details);
        const errors = joiInputErrorsFormater(e?.details);
        return InputErr({
          message: `Fail to Create input Fields!`,
          extensions: {
            status: 400,
            errors,
          },
        });
      } else if (e?.extensions) {
        return InputErr(e);
      }
      errorHandler(e);
    }
  }, */
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
