// import ord from '../models/Order.js';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import errorHandler from '../utils/errorHandler.js';
import orderServices from '../services/orderServices.js';
import userCustomerServices from '../services/userCustomerServices.js';
// let Order;
// ord.then((d) => (Order = d)).catch((e) => console.log(e));
// orderServices.findOrder();
//   .then((d) => console.log(d))
//   .catch((d) => console.log(d));
export default {
  /**
   * Create New Order
   */
  createOrder: async (_parent, { order }, _context) => {
    try {
      const newOrder = await orderServices.newOrder({ ...order });
      await userCustomerServices.customerOrderIDUpdate(
        order.customer,
        newOrder.id
      );
      return newOrder;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * All Orders
   */
  allOrders: async (_parent, { key, value }, _context) => {
    //
    try {
      const filter = key && value ? { [key]: value } : {};
      const all = await orderServices.findOrder(filter);
      // console.log(all);
      return all;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Single Order
   */
  getOrder: async (_parent, { id }, _context) => {
    try {
      if (!mg.isValidObjectId(id))
        throw new UserInputError(`Invalid delete id`);
      const order = await orderServices.findOrder('id', id);
      // console.log(order);
      return order;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Create New Order
   */
  updateOrder: async (_parent, { id, update }, _context) => {
    try {
      const updated = await Order.findByIdAndUpdate(id, update, { new: true });
      return updated;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Delete Order
   */
  deleteOrder: async (_parent, { id: _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = await Order.deleteOne({ _id });
      console.log(del);
      return del.deletedCount;
    } catch (e) {
      errorHandler(e);
    }
  },
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
