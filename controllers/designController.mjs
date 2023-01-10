import mg from 'mongoose';
import Design from '../models/Design.mjs';
import { UserInputError } from 'apollo-server-core';
import designValidation from '../validation/designValidation.mjs';
import errorHandler from '../utils/errorHandler.mjs';
import designServices from '../services/designServices.mjs';

export default {
  /**
   * Create New design
   */
  createDesign: async (_parent, { design }, context) => {
    try {
      await designValidation.newDesignValidation({ ...design });
      const data = await designServices.createDesign(design);
      // console.log(data);
      return data;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * All designs
   */
  allDesigns: async (_parent, { key, value }, context) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      return await designServices.findDesign(filter);
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Single design
   */
  getDesign: async (_parent, { key, value }, context) => {
    try {
      if (key === '_id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid delete id`);
      const design = await designServices.findDesign(key, value);
      return design;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Create New design
   */
  updateDesign: async (_parent, { id, update }, context) => {
    try {
      const updated = await Design.findByIdAndUpdate(id, update, { new: true });
      return updated;
    } catch (e) {
      errorHandler(e);
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
    } catch (e) {
      errorHandler(e);
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
// .then((d) => console.log(d))
// .catch((e) => console.log(e));

// designServices
//   .findDesign('_id', '63373a972dcb8d4b6d89f233')
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
