import Measurement from '../models/Measurement.js';
import mg from 'mongoose';
import { AuthenticationError, UserInputError } from 'apollo-server';
import measureValidation from '../validation/measureValidation.js';
import errorHandler from '../utils/errorHandler.js';
import measurementServices from '../services/measurementServices.js';
import { isConstValueNode } from 'graphql';

export default {
  /**
   * Create New Measurement
   */
  createMeasurement: async (_parent, { measures }, _context) => {
    try {
      // console.log(measures, '===create');
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
      const filter = key && value ? { [key]: value } : {};
      const all = await Measurement.find(filter);
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
      if (key === 'id' && !mg.isValidObjectId(value))
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
