import Measurement from '../models/Measurement.js';
import mg from 'mongoose';
import { AuthenticationError, UserInputError } from 'apollo-server';
import measureValidation from '../validation/measureValidation.js';
import errorHandler from '../utils/errorHandler.js';
import measurementServices from '../services/measurementServices.js';
import stringToQryString from '../utils/stringToQryString.js';
// template: { $exists: false }
// measurementServices
//   .findMeasurement(
//     {
//       _id: [
//         '632ede627d322d06d626b8e6',
//         '632edb3d7d322d06d626b8cb',
//         '632f44991125f00a064d19ab',
//       ],
//     },
//     null,
//     'label',
//     true
//   )
// .then((d) => console.log(d))
// .catch((e) => console.log(e));

// Measurement.aggregate([
//   {
//     $group: {
//       _id: { type: '$type' },
//     },
//   },
// ])
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
export default {
  /**
   * Create New Measurement
   */
  createMeasurement: async (_parent, { measures }, _context) => {
    try {
      await measureValidation.measurementValidation(measures);
      const newMeasurement = new Measurement(measures);
      await newMeasurement.save();
      return newMeasurement;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * All Measurements
   */
  allMeasurements: async (_parent, { key, value }, _context) => {
    try {
      let filter = key && value ? { [key]: value } : {};
      if (key && !value) {
        filter = stringToQryString(key);
      }
      const all = await Measurement.find(filter);
      // console.log(all);
      return all;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Single Measurement
   */
  getMeasurement: async (_parent, { key, value }, { isAuthorized }) => {
    try {
      if (!isAuthorized) throw AuthenticationError(`Unauthorized user!`);
      if (key === '_id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid id, get ${value}`);
      return await measurementServices.findMeasurement(key, value);
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Create New Measurement
   */
  updateMeasurement: async (_parent, { id, update }, _context) => {
    try {
      await measureValidation.measurementUpdateValidation({ id, ...update });
      const updated = await measurementServices.measurementUpdate(
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
   * Delete Measurement
   */
  deleteMeasurement: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await Measurement.deleteOne({ _id });
      console.log(del);
      return del.deletedCount;
    } catch (e) {
      errorHandler(e);
    }
  },
};

// Measurement.create({
//   name: 'body',
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
