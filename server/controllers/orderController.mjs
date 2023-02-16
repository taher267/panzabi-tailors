import Order from '../models/Order.mjs';
import mg from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import errorHandler, { InputErr } from '../utils/errorHandler.mjs';
import orderServices from '../services/orderServices.mjs';
import userCustomerServices from '../services/userCustomerServices.mjs';
// import TestModel from '../models/TestModel.mjs';
import orderValidation from '../validation/orderValidation.mjs';
import clonning from '../utils/clonning.mjs';
import tempUp from '../template/temp-up.mjs';
import order_item_sample from '../order_item_sample.mjs';
import moment from 'moment';
import Template from '../models/Template.mjs';
// console.log(typeof tempUp);
const temp2 = `<div id="wrapper" style="margin-top:50px">
<div
  style="width:17%;display:block;float:left;font-size:12.5px;line-height:20px"
>
  <p>&nbsp;</p>
  <p style="display: flex">একছাটা <input type="checkbox" checked /></p>
  <p style="display: flex">একছাটা <input type="checkbox" checked /></p>
  <p style="display: flex">একছাটা <input type="checkbox" checked /></p>
  <p style="display: flex">একছাটা <input type="checkbox" checked /></p>
</div>
<div style="width:83%;display:inline-block">
<div style="display:flex;font-size:13.5px">
    <p style="margin-left:25mm">নং- {order_no}</p>
    <p style="margin-left:38mm">তারিখ- {print_date}</p>
  </div>
  <div
    style="display:flex;justify-content:space-between;width:142mm;max-width:100%;padding:0 5px;padding-right:5px; font-size:12.5px"
  >
    <div>
      <div>লম্বা</div>
      <div>&nbsp;</div>
      <div>leng</div>
    </div>
    <div>
      <p>বডি</p>
      <p>বডি</p>
      <p>বডি</p>
      <p>বডি</p>
      <p>বডি</p>
    </div>
    <div>পুট</div>
    <div>
      <div>হাতা</div>
      <div>হাতা</div>
    </div>
    <div>কলার</div>
    <div>
      <div>হাতার মুহরি</div>
      <div>হাতার মুহরি</div>
    </div>
    <div>বুতাম</div>
    <div>বুতাম</div>
  </div>
</div>
</div>`;

// Template.create({
//   name: 'Temp-01',
//   productsPlace: {
//     tag: `<p style='display: flex'>product_place<input type='checkbox' checked /></p>`,
//     placeOn: 'product_place',
//     replaceOn: 'all_product_place',
//   },
//   temp: temp2,
// })
//   .then((d) => console.log(d))
//   .catch((d) => console.log(d));
async function testing() {
  console.log(order_item_sample?.measurements);
}

// testing();
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
      // await orderValidation.newOrderValidation(order);
      if (order?.order_no) {
        const doesExist = await orderServices.findOrder(
          'order_no',
          order?.order_no
        );
        if (doesExist)
          throw new UserInputError(`Fail to create order`, {
            errors: { order_no: `Order no already exists` },
            status: 400,
          });
      }
      const newOrder = await orderServices.newOrder({ ...order });
      await userCustomerServices.customerOrderIDUpdate(order.customer, {
        $push: { orders: newOrder.id }, //  order_no: order.order_no
      });
      return newOrder;
    } catch (e) {
      if (e?.extensions) {
        throw InputErr(e);
      }
      throw errorHandler(e);
    }
  },

  /**
   * Update Order
   */
  addNewOrderItem: async (_, { _id, newItem }) => {
    try {
      const { order_items, ...rest } = newItem;
      // console.log(order_items);

      const filteredData = await orderValidation.newOrderItemValidation(
        _id,
        newItem
      );

      const addedNewItem = await orderServices.orderUpdate(
        { _id },
        {
          ...filteredData,
          $push: { order_items: newItem.order_items },
        },
        { runValidators: true }
      );
      return addedNewItem;
    } catch (e) {
      const status = e?.extensions?.status;
      if (status > 399 && 500 > status) {
        return InputErr(e);
      }
      errorHandler(e);
    }
  },
  /**
   * 
   addNewOrderItem: async (_, { _id, newItem }) => {
    try {
      const { order_items, ...rest } = newItem;
      // console.log(order_items);

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
      const status = e?.extensions?.status;
      if (status > 399 && 500 > status) {
        return InputErr(e);
      }
      errorHandler(e);
    }
  },
   */
  /**
   * All Orders
   */
  allOrders: async (_parent, { key, value, options }, _context) => {
    //
    try {
      let filter = key && value ? { [key]: value } : {};
      const all = await orderServices.findAllOrders(filter, null, options);
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
      const order = await orderServices.findOrder(key, value, null, [
        'customer',
        'name phone_no email transportation.transport_name',
      ]);
      // console.log(order);
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

      let htmlTemplate = `<div id='singleSlipPrintwrapper' style='margin-top:50px'>
      <div
        style='width:10%;display:block;float:left;font-size:12.5px;line-height:20px'
      >
        <p>&nbsp;</p>
        all_product_place
      </div>
      <div style='width:83%;display:inline-block'>
      <div style='display:flex;font-size:13.5px'>
          <p style='margin-left:25mm'>নং- ${order?.order_no}</p>
          <p style='margin-left:38mm'>তারিখ- ${moment().format(
            'YYYY-MM-DD'
          )}</p>
        </div>
        <div
          style='display:flex;justify-content:space-between;width:142mm;max-width:100%;padding:0 5px; font-size:12.5px'
        >
          <div>
            <div>লম্বা</div>
            <div>&nbsp;</div>
            <div>{plate_length}</div>
          </div>
          <div>
            <p>বডি</p>
          </div>
          <div>পুট</div>
          <div>
            <div>হাতা</div>
            <div></div>
          </div>
          <div>কলার</div>
          <div>
            <div>হাতার মুহরি</div>
            <div></div>
          </div>
          <div>বুতাম</div>
          <div></div>
        </div>
      </div>
    </div>`;
      const productsRep = {
        tag: `<p style='display: flex'>product_place<input type='checkbox' checked /></p>`,
        placeOn: 'product_place',
        replaceOn: 'all_product_place',
      };
      const prductsDesigns = Object.values(order_item?.products).reduce(
        (a, { name }) =>
          (a += productsRep?.tag?.replace?.(productsRep?.placeOn, name)),
        ''
      );

      htmlTemplate = htmlTemplate?.replace?.(
        productsRep?.replaceOn,
        prductsDesigns
      );
      for (const measue of order_item?.measurements || []) {
        let { size, label } = measue;
        htmlTemplate = htmlTemplate.replace(label, size);

        // htmlTemplate.replace(label, size);
      }

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
      const check = await orderValidation.isValidUpdateOrderItem(update);
      // console.log(check, 'check');
      console.log('order');

      const order = await orderServices.findOrder('_id', _id);
      if (!order)
        return new UserInputError(`There is not order item`, {
          errors: {
            success: false,
            message: `There is not order item of this id ${id}`,
          },
        });
      let totalQty = order.totalQty;
      let totalPrice = order.totalPrice;
      let totalPayments =
        order?.discount +
        order?.advanced +
        order.payments?.reduce((a, { amount }) => {
          if (amount) {
            a += amount;
          }
          return a;
        }, 0);

      const order_items = order.order_items?.map?.((item) => {
        if (item._id?.toString?.() === update.itemId) {
          totalPrice -=
            item.quantity * item.price - update.quantity * update.price;
          totalQty -= item.quantity - update.quantity;
          return {
            ...item,
            ...update,
          };
        }
        return item;
      });
      order.totalQty = totalQty;
      order.totalPrice = totalPrice;
      order.order_items = order_items;
      order.due = totalPrice - totalPayments;

      const updated = await order.save();
      // console.log(updated);
      return true;
    } catch (e) {
      if (e.isJoi) {
        const objErr = e.details.reduce((a, c) => {
          let {
            message,
            context: { key },
          } = c;
          // console.log(context);
          a[key] = message?.replace?.(/"/g, '');
          return a;
        }, {});
        return new UserInputError(`Fail to update order item!`, {
          status: 400,
          errors: {
            success: false,
            ...objErr,
          },
        });
      }
      // console.log(e);
      errorHandler(e);
    }
  },
  /**
   * Delete Order
   */
  deleteOrder: async (_parent, { _id, customer }, info) => {
    try {
      if (!mg.isValidObjectId(_id) || !mg.isValidObjectId(customer))
        throw new UserInputError(`Invalid delete id`);
      const delQ = await orderServices.orderDelete('_id', _id);
      const up = await userCustomerServices.customerOrderIDUpdate(customer, {
        $pull: { orders: _id },
      });
      // console.log(info.user?);
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