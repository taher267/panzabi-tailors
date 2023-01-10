import ord from '../models/Order.mjs';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import errorHandler from '../utils/errorHandler.mjs';
import orderServices from '../services/orderServices.mjs';
import userCustomerServices from '../services/userCustomerServices.mjs';
// import TestModel from '../models/TestModel.mjs';
import orderValidation from '../validation/orderValidation.mjs';
import clonning from '../utils/clonning.mjs';
import tempUp from '../template/temp-up.mjs';
import order_item_sample from '../order_item_sample.mjs';
// console.log(typeof tempUp);
let Order;
ord.then((d) => (Order = d)).catch((e) => console.log(e));
console.log();
// let sum = new Function(
//   'd',
//   `<div className="contentData">
//   <div className="printCard" style='display:flex;'>
//     <div
//       className="productsCard"
//       style="width: ${
//         d?.connection === 'down'
//           ? '38mm;'
//           : d?.connection === 'up'
//           ? '23mm;'
//           : ''
//       }"
//     >
// ${Object.values(d?.products).reduce?.(
//   (a, { name }) => (a += `<p>${name}</p>`),
//   ''
// )}
//     </div>
//     <div className="printDesign" style='display:flex;'>
//       ${Object.values(d?.measurements).reduce?.(
//         (a, { label, size }) =>
//           (a += `<div><p>${label}</p><p>${size}</p></div>`),
//         ''
//       )}
//     </div>
//   </div>
// </div>`
// );

// console.log(sum([{ p: 1, q: 2 }, { q: 1, p: 2 }, 3, 4, 5]));
export default {
  /**
   * Create New Order
   */
  createOrder: async (_parent, { order }, _context) => {
    try {
      const newOrder = await orderServices.newOrder({ ...order });
      await userCustomerServices.customerOrderIDUpdate(order.customer, {
        $push: { orders: { order_id: newOrder.id, order_no: order.order_no } },
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
      let filter = key && value ? { [key]: value } : {};
      const all = await orderServices.findOrder(filter, null, '-order_items');
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
   * Single Order item
   */
  getOrderItem: async (_parent, { id, key }, _context) => {
    try {
      if (!mg.isValidObjectId(id)) throw new UserInputError(`Invalid order id`);
      const order = await orderServices.findOrder(
        '_id',
        id,
        'order_items order_no'
      );
      // let order_item = clonning(order.order_items)[0];
      let order_item = clonning(order.order_items)?.filter(
        (item) => item._id === key
      )?.[0];
      // console.log(JSON.stringify(order_item));
      // const measurements = Object.values(order_item?.measurements).map?.(
      //   ({ label, size }) => {
      //     return `<div><p>${label}</p><p>${size}</p></div>`;
      //   }
      // );
      // console.log(measurements);
      // tempUp.replace('product_place', '1111111')

      let htmlTemplate = tempUp;
      const productsRep = {
        tag: `<p>product_place</p>`,
        placeOn: 'product_place',
        replaceOn: 'all_product_place',
      };
      const prductsDesigns = Object.values(order_item?.products).reduce(
        (a, { name }) =>
          (a += productsRep?.tag?.replace?.(productsRep?.placeOn, name)),
        ''
      );
      htmlTemplate = JSON.stringify(htmlTemplate).replace(
        productsRep?.replaceOn,
        prductsDesigns
      );
      // console.log(htmlTemplate);

      // for (const prod of order_item?.products) {
      //   htmlTemplate = htmlTemplate.replace(productsRep, ``);
      // }

      //   let htmlTemplate = `<div className="contentData">
      //   <div className="printCard" style='display:flex;'>
      //     <div
      //       className="productsCard"
      //       style="width: ${
      //         order_item?.connection === 'down'
      //           ? '38mm;'
      //           : order_item?.connection === 'up'
      //           ? '23mm;'
      //           : ''
      //       }"
      //     >
      // ${Object.values(order_item?.products).reduce?.(
      //   (a, { name }) => (a += `<p>${name}</p>`),
      //   ''
      // )}
      //     </div>
      //     <div className="printDesign" style='display:flex;'>
      //       ${Object.values(order_item?.measurements).reduce?.(
      //         (a, { label, size }) =>
      //           (a += `<div><p>${label}</p><p>${size}</p></div>`),
      //         ''
      //       )}
      //     </div>
      //   </div>
      // </div>`;
      // console.log(htmlTemplate);
      const result = {
        ...order_item,
        htmlTemplate,
        order_no: order.order_no,
      };
      return result;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Update Order
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
   * Update payment of Order
   */
  updatePayment: async (_parent, { id, update }, { req }) => {
    try {
      // throw new UserInputError(`Minimum update data Mandatory!`);
      if (!update?.order_status && !update?.on)
        throw new UserInputError(`Minimum update data Mandatory!`);
      const issueBy = req.user._id;
      // const updated = await Order.findByIdAndUpdate(id, update, { new: true });
      let updateShape = {};
      if (update?.amount || update?.discount) {
        const order = await Order.findById(id).select(
          ' totalQty totalPrice discount advanced due transport_charge order_items.price order_items.quantity order_status payments.amount'
        );

        if (!order)
          throw new UserInputError(`Could not able to get the order by id!`);
        const {
          order_items,
          totalPrice,
          payments,
          advanced,
          due,
          discount,
          transport_charge,
        } = order;
        if (due === 0) throw new UserInputError(`গ্রাহকের কোনো বকেয়া নেই!`);
        const allProductsPriceSum = order_items.reduce(
          (a, { price, quantity }) => a + price * quantity,
          0
        );
        if (allProductsPriceSum !== totalPrice) {
          throw new UserInputError(
            `Each product price sum with total price mismatch!`
          );
        }
        const totalPayments = payments.reduce(
          (a, { amount = 0 }) => (a += amount),
          0
        );

        const { discount: newDiscount, ...upRest } = update;
        const totalPaid = advanced + discount + totalPayments;
        const newPaid = (newDiscount || 0) + update?.amount || 0;
        const totalWithNewPayments = totalPaid + newPaid;
        const remainingPayment = due - newPaid;
        const isEqual = totalPrice - totalWithNewPayments === remainingPayment;
        if (!isEqual) throw new UserInputError(`Got issue on total price!`);
        if (remainingPayment < 0)
          throw new UserInputError(
            `Customer remaining payment: ${remainingPayment}`
          );

        updateShape = {
          $inc: {
            discount: update?.discount || 0,
            due: -((update?.amount || 0) + (update?.discount || 0)),
          },
        };
        if (update?.amount) {
          updateShape.$push = { payments: { ...upRest, issueBy } };
        }
      }
      if (update?.order_status) {
        updateShape.order_status = update.order_status;
      }
      // console.log(updateShape);
      await Order.findByIdAndUpdate(id, updateShape);
      return true;
    } catch (e) {
      errorHandler(e);
    }
  },

  /**
   * Update Order item
   */
  updateOrderItem: async (_parent, { _id, update }, { req }) => {
    try {
      console.log(_id);
      return true;
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
