import mg from 'mongoose';
import Design from '../models/Design.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import { UserInputError } from 'apollo-server-core';
export default {
  /**
   * Create New design
   */
  createDesign: async (_parent, { design }, context) => {
    try {
      const newDesign = new Design(design);
      await newDesign.save();
      return newDesign;
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * All designs
   */
  designs: async (_parent, { key, value }, context) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      return await Design.find(filter);
    } catch (e) {
      throw new UserInputError(e);
    }
  },
  /**
   * Single design
   */
  getDesign: async (_parent, { id }, context) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      return await Design.findById(id);
    } catch (error) {
      throw new UserInputError(e);
    }
  },
  /**
   * Create New design
   */
  updateDesign: async (_parent, { id, update }, context) => {
    try {
      const updated = await Design.findByIdAndUpdate(id, update, { new: true });
      return updated;
    } catch (error) {
      throw new UserInputError(e);
    }
  },
  /**
   * Delete Design
   */
  deleteDesign: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await Design.deleteOne({ _id });
      console.log(del);
      return del.deletedCount;
    } catch (error) {
      throw new UserInputError(e);
    }
  },
};

// Design.create({
//   name: 'কলার',
//   designs: [
//     { item: 'শেরওয়ানী রাউন্ড কলার ক্যাটালগ', _id: 1 },
//     { item: 'শেরওয়ানী কলার ক্যাটালগ', _id: 2 },
//     { item: 'শেরওয়ানী কলার ক্যাটালগ', _id: 3 },
//     { item: 'শেরওয়ানী রাউন্ড কলার', _id: 4 },
//     { item: 'বেল্ড কলার', _id: 5 },
//   ],
//   type: 1,
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));

// Design.findByIdAndRemove({ _id: '6324cf84c61dc2642cbdb54f' })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
