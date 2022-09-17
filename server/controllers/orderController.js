import Order from '../models/Order.js';
import mg from 'mongoose';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';

export default {
  /**
   * Create New Order
   */
  createOrder: catchAsyncErrors(async (_parent, { order }, _context) => {
    const newOrder = new Order(order);
    await newOrder.save();
    return newOrder;
  }),
  /**
   * All Orders
   */
  allOrders: catchAsyncErrors(async (_parent, { key, value }, _context) => {
    const filter = key && value ? { [key]: value } : {};
    return await Order.find(filter);
  }),
  /**
   * Single Order
   */
  getOrder: catchAsyncErrors(async (_parent, { id }, _context) => {
    if (!mg.isValidObjectId(id)) throw new UserInputError(`Invalid delete id`);
    return await Order.findById(id);
  }),
  /**
   * Create New Order
   */
  updateOrder: catchAsyncErrors(async (_parent, { id, update }, _context) => {
    const updated = await Order.findByIdAndUpdate(id, update, { new: true });
    return updated;
  }),
  /**
   * Delete Order
   */
  deleteOrder: catchAsyncErrors(async (_parent, { id: _id }) => {
    if (!mg.isValidObjectId(_id)) throw new UserInputError(`Invalid delete id`);
    const del = await Order.deleteOne({ _id });
    console.log(del);
    return del.deletedCount;
  }),
};

// Order.create({
//   order_no: 1,
//   quantity: 1,
//   totalPrice: 500,
//   user: "6324efa9255bce344100a4da",

//   order_status: "PROCESSING",
//   orders: [
//     {
//       order: "6324e1243fefdc8d0b5dd571",
//       price: 500,
//       measurements: [
//         {
//           _id: "6324e1243fefdc8d0b5dd579",
//           size: "35'",
//         },
//       ],
//       designs: [{ "6324e1243fefdc8d0b5dd579": '4343' }],
//     },
//   ],
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
