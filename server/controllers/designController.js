import mg from 'mongoose';
import Design from '../models/Design.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import { UserInputError } from 'apollo-server';
export default {
  /**
   * Create New design
   */
  createDesign: catchAsyncErrors(async (_parent, { design }, { req, res }) => {
    const newDesign = new Design(design);
    await newDesign.save();
    return newDesign;
  }),
  /**
   * All designs
   */
  designs: catchAsyncErrors(async (_parent, { key, value }, { req, res }) => {
    const filter = key && value ? { [key]: value } : {};
    return await Design.find(filter);
  }),
  /**
   * Single design
   */
  getDesign: catchAsyncErrors(async (_parent, { id }, { req, res }) => {
    if (!mg.isValidObjectId(_id)) throw new UserInputError(`Invalid delete id`);
    return await Design.findById(id);
  }),
  /**
   * Create New design
   */
  updateDesign: catchAsyncErrors(
    async (_parent, { id, update }, { req, res }) => {
      const updated = await Design.findByIdAndUpdate(id, update, { new: true });
      return updated;
    }
  ),
  /**
   * Delete Design
   */
  deleteDesign: catchAsyncErrors(async (_parent, { id: _id }) => {
    if (!mg.isValidObjectId(_id)) throw new UserInputError(`Invalid delete id`);
    const del = await Design.deleteOne({ _id });
    console.log(del);
    return del.deletedCount;
  }),
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
