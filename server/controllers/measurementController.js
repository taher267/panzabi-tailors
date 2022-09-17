import Measurement from '../models/Measurement.js';
import mg from 'mongoose';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';

export default {
  /**
   * Create New Measurement
   */
  createMeasurement: catchAsyncErrors(
    async (_parent, { measures }, _context) => {
      const newMeasurement = new Measurement(measures);
      await newMeasurement.save();
      return newMeasurement;
    }
  ),
  /**
   * All Measurements
   */
  allMeasurements: catchAsyncErrors(
    async (_parent, { key, value }, _context) => {
      const filter = key && value ? { [key]: value } : {};
      return await Measurement.find(filter);
    }
  ),
  /**
   * Single Measurement
   */
  getMeasurement: catchAsyncErrors(async (_parent, { id }, _context) => {
    if (!mg.isValidObjectId(id)) throw new UserInputError(`Invalid delete id`);
    return await Measurement.findById(id);
  }),
  /**
   * Create New Measurement
   */
  updateMeasurement: catchAsyncErrors(
    async (_parent, { id, update }, _context) => {
      const updated = await Measurement.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updated;
    }
  ),
  /**
   * Delete Measurement
   */
  deleteMeasurement: catchAsyncErrors(async (_parent, { id: _id }) => {
    if (!mg.isValidObjectId(_id)) throw new UserInputError(`Invalid delete id`);
    const del = await Measurement.deleteOne({ _id });
    console.log(del);
    return del.deletedCount;
  }),
};

// Measurement.create({
//   name: 'body',
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
