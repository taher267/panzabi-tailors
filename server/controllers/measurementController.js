import Measurement from '../models/Measurement.js';
import mg from 'mongoose';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import { UserInputError } from 'apollo-server-core';

export default {
  /**
   * Create New Measurement
   */
  createMeasurement: async (_parent, { measures }, _context) => {
    try {
      const newMeasurement = new Measurement(measures);
      await newMeasurement.save();
      return newMeasurement;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * All Measurements
   */
  allMeasurements: async (_parent, { key, value }, _context) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      const all = await Measurement.find(filter);
      let newArr = [];
      for (const iter of all) {
        let { _id: id, ...rest } = iter.doc;
        newArr.push({
          id,
          ...rest,
        });
      }
      return newArr;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Single Measurement
   */
  getMeasurement: async (_parent, { id }, _context) => {
    try {
      if (!mg.isValidObjectId(id))
        throw new UserInputError(`Invalid delete id`);
      return await Measurement.findById(id);
    } catch (e) {
      throw UserInputError(e);
    }
  },
  /**
   * Create New Measurement
   */
  updateMeasurement: async (_parent, { id, update }, _context) => {
    try {
      const updated = await Measurement.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updated;
    } catch (e) {
      throw UserInputError(e);
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
      throw UserInputError(e);
    }
  },
};

// Measurement.create({
//   name: 'body',
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
