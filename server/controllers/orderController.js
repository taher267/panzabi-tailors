// import ord from '../models/Order.js';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import errorHandler from '../utils/errorHandler.js';
import orderServices from '../services/orderServices.js';
import userCustomerServices from '../services/userCustomerServices.js';
// import TestModel from '../models/TestModel.js';
import orderValidation from '../validation/orderValidation.js';
// TestModel.create({
//   strData: Math.random()?.toString?.(),
//   arrData: [
//     {
//       name: Math.random()?.toString?.(),
//       arr: [
//         {
//           data: Math.random()?.toString?.(),
//           data2: Math.random()?.toString?.(),
//         },
//       ],
//     },
//   ],
// })
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// TestModel.updateOne(
//   { _id: '638f5ea0f6a71645b1ad4163' },
//   {
//     $push: {
//       'arrData.0.arr': [
//         {
//           data: Math.random()?.toString?.(),
//           data2: Math.random()?.toString?.(),
//         },
//       ],
//     },
//   },
//   { new: true }
// )
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// TestModel.find()
//   .then((d) => {
//     console.log(d?.[0]?.arrData?.[0]?.arr);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

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
      await userCustomerServices.customerOrderIDUpdate(order.customer, {
        $push: { orders: newOrder.id },
      });
      return newOrder;
    } catch (e) {
      errorHandler(e);
    }
  },

  /**
   * Update Order
   */
  addNewOrderItem: async (_, { _id, newItem }) => {
    try {
      const { order_items, ...rest } = newItem;
      await orderValidation.newOrderItemValidation(_id, newItem);

      const addedNewItem = await orderServices.orderUpdate(
        { _id },
        {
          ...rest,
          $push: { order_items: newItem.order_items },
        }
      );
      return addedNewItem;
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
  getOrder: async (_parent, { key, value }, _context) => {
    try {
      if (key === '_id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid delete id`);
      const order = await orderServices.findOrder(key, value);
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
  deleteOrder: async (_parent, { _id, customer }) => {
    try {
      if (!mg.isValidObjectId(_id) || !mg.isValidObjectId(customer))
        throw new UserInputError(`Invalid delete id`);
      const delQ = await orderServices.orderDelete('_id', _id);
      const up = await userCustomerServices.customerOrderIDUpdate(customer, {
        $pull: { orders: _id },
      });
      // console.log(_id, customer, delQ, up);
      const del = {
        success: true,
        delID: _id,
      };
      return del;
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