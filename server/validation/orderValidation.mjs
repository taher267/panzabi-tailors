import { UserInputError } from 'apollo-server';
import Joi from 'joi';
import orderServices from '../services/orderServices.mjs';
import errorHandler, { InputErr } from '../utils/errorHandler.mjs';
const productsSchema = Joi.array()
  .items(
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
    }).required()
  )
  .required();
const measurementsSchema = Joi.array()
  .items(
    Joi.object({
      msr_id: Joi.string().required(),
      size: Joi.string().required(),
      label: Joi.string().required(),
    }).required()
  )
  .required();
const designsItemsSchema = Joi.array()
  .items(
    Joi.object({
      dsn_id: Joi.string().required(),
      label: Joi.string().required(),
      desc: Joi.string(),
    }).required()
  )
  .required();
const designsSchema = Joi.array()
  .items(
    Joi.object({
      group: Joi.string().required(),
      items: designsItemsSchema,
    }).required()
  )
  .required();
const ItemsSchema = Joi.array()
  .items(
    Joi.object({
      connection: Joi.string().valid('up', 'down').required(),
      products: productsSchema,
      measurements: measurementsSchema,
      designs: designsSchema,
      price: Joi.number().required(),
      order_date: Joi.date().required(),
      sample: Joi.object({
        id: Joi.string(),
        src: Joi.string(),
      }),
      user: Joi.string().required(),
      quantity: Joi.number().required(),
    }).required()
  )
  .required();
const newOrderValidSchema = Joi.object({
  order_no: Joi.string().required(),
  previous_order: Joi.string(),
  totalQty: Joi.number().required(),
  totalPrice: Joi.number().required(),
  discount: Joi.number(),
  advanced: Joi.number(),
  due: Joi.number(),
  transport_charge: Joi.number(),
  // user: Joi.string().required(),
  customer: Joi.string().required(),
  order_status: Joi.string()
    .valid('COMPLETED', 'ALTER', 'PROCESSING', 'NEW', 'DELIVIRED')
    .required(),
  // Order items
  order_items: ItemsSchema,
  delivery_date: Joi.date().required(),
  // payments:Joi.object().required()
  notes: Joi.string(),
}).required();

const joiNewOrderValidation = (payload) =>
  newOrderValidSchema.validateAsync(payload, { abortEarly: false });
// const newOrderValidation = async ({ order_no, type, orders, ...rest }) => {
//   let errors = {};
//   try {
//     //order_no
//     if (!order_no) errors.order_no = `order name is mandatory!`;
//     else if (await orderServices.findOrder('order_no', order_no))
//       errors.order_no = `order name is already exists!`;
//     //type
//     if (!type?.length) errors.type = `Type is mandatory!`;
//     // else if (!Array.isArray(type))errors.type = `Type should be an array!`;
//     //type
//     if (!orders?.length) errors.orders = `orders are mandatory!`;
//     else if (!Array.isArray(orders))
//       errors.orders = `order should be an array!`;

//     // error throw
//     if (!Object.keys(errors).length) return true;
//     throw new UserInputError(
//       `A number's of errors cought on ${Object.keys(errors).join(', ')}`,
//       { errors }
//     );
//   } catch (e) {
//     errorHandler(e);
//   }
// };

const newOrderItemValidation = async (_id, newItem) => {
  let errors = {};
  try {
    const {
      customer,
      order_no,
      previous_order,
      totalQty,
      totalPrice,
      discount,
      advanced,
      due,
      transport_charge,
      order_status,
      order_items,
    } = newItem;
    //previous order no
    if (!order_no) errors.order_no = `Order number is mandatory!`;
    if (!previous_order)
      errors.previous_order = `Previous order no is mandatory!`;
    else if (previous_order !== order_no)
      errors.previous_order = `Previous order no is not equal to order number!`;
    let subTotal = totalPrice;
    let subDiscount = discount ?? 0;
    let subAdvanced = advanced ?? 0;
    let subQty = totalQty;
    let subDue = due ?? 0;
    let subTransportChage = transport_charge ?? 0;
    if (!order_items?.length) {
      errors.order_items = `Doesn't get any item!`;
    } else {
      let newTotalPrice = 0;
      let newTotalQty = 0;
      for (const { quantity, price } of order_items) {
        newTotalPrice += price * quantity;
        newTotalQty += quantity;
      }

      // console.log(newTotalPrice, newTotalQty, totalPrice);
      const order = await orderServices.findOrder('_id', _id);

      if (!order) {
        errors.commons = `Doesn't get any order of this id`;
      } else {
        subTotal += order.totalPrice;
        subDiscount += order.discount ?? 0;
        subAdvanced += order.advanced ?? 0;
        subQty += order.totalQty;
        subDue += order.due ?? 0;
        subTransportChage += order.transport_charge ?? 0;

        if (subDue < 0) errors.due = `Due can't be less than 0!`;

        let prevTotalPrice = 0;
        let prevTotalQty = 0;

        for (const {
          quantity: qty,
          price: value,
          products,
        } of order?.order_items ?? []) {
          prevTotalPrice += value * qty;
          prevTotalQty += qty;
          if (!qty) errors.order_items.quantity = `Item quanity is mandatory!`;
          if (!value) errors.order_items.price = `Item Price is mandatory!`;
          if (!products?.length)
            errors.order_items.products = `Item products is mandatory!`;
        }

        const payments = order?.payments?.reduce?.((a, { amount }) => {
          a += amount ?? 0;
          return a;
        }, 0);
        if (subTotal < subAdvanced + payments)
          errors.totalPrice = `Payment can't be greter than Total, ${
            subAdvanced + payments
          }`;
      }
    }
    const delKeys = ['discount', 'advanced', 'due', 'transport_charge'];
    const upObj = {
      totalPrice: subTotal,
      discount: subDiscount,
      advanced: subAdvanced,
      totalQty: subQty,
      due: subDue,
      transport_charge: subTransportChage,
      order_status,
    };
    // "previous_order": [],
    for (const k of delKeys) {
      delete upObj[k];
    }

    // error throw
    if (!Object.keys(errors).length) return upObj;
    throw new UserInputError(`Failed to add order item`, {
      status: 400,
      errors,
    });
  } catch (e) {
    const status = e?.extensions?.status;
    if (status > 399 && 500 > status) {
      return InputErr(e);
    }
    errorHandler(e);
  }
};

/**
 * const newOrderItemValidation = async (_id, newItem) => {
  let errors = {};
  try {
    const {
      customer,
      order_no,
      previous_order,
      totalQty,
      totalPrice,
      discount,
      advanced,
      due,
      transport_charge,
      order_status,
      order_items,
    } = newItem;
    //previous order no
    if (!order_no) errors.order_no = `Order number is mandatory!`;
    if (!previous_order)
      errors.previous_order = `Previous order no is mandatory!`;
    else if (previous_order !== order_no)
      errors.previous_order = `Previous order no is not equal to order number!`;
    if (!order_items?.length) {
      errors.order_items = `Doesn't get any item!`;
    } else {
      let newTotalPrice = 0;
      let newTotalQty = 0;
      for (const { quantity, price } of order_items) {
        newTotalPrice += price * quantity;
        newTotalQty += quantity;
      }

      // console.log(newTotalPrice, newTotalQty, totalPrice);
      const order = await orderServices.findOrder('_id', _id);
      if (!order) {
        errors.commons = `Doesn't get any order of this id`;
      } else {
        let prevTotalPrice = 0;
        let prevTotalQty = 0;
        for (const { quantity: qty, price: value } of order?.order_items ||
          []) {
          prevTotalPrice += value * qty;
          prevTotalQty += qty;
        }

        console.log(newTotalPrice + prevTotalPrice, totalPrice);
        if (newTotalPrice + prevTotalPrice !== totalPrice) {
          errors.totalPrice = `Total price is miscalculated`;
        }
        if (newTotalQty + prevTotalQty !== totalQty) {
          errors.totalQty = `Total quantiry is miscalculated!`;
        }
      }
    }
    // error throw
    if (!Object.keys(errors).length) return true;
    throw new UserInputError(
      `A number's of errors cought on ${Object.keys(errors).join(', ')}`,
      { errors }
    );
  } catch (e) {
    errorHandler(e);
  }
};
 */

const updateOrderItemSchema = Joi.object({
  // _id: Joi.string().required(),
  itemId: Joi.string().required(),
  // connection: Joi.string().valid('up', 'down').required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  products: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
      }).required()
    )
    .required(),
  designs: Joi.array()
    .items(
      Joi.object({
        group: Joi.string().required(),
        items: Joi.array()
          .items(
            Joi.object({
              label: Joi.string().required(),
              dsn_id: Joi.string().required(),
              desc: Joi.string().allow(''),
            })
          )
          .required(),
      }).required()
    )
    .required(),
  measurements: Joi.array()
    .items(
      Joi.object({
        msr_id: Joi.string().required(),
        label: Joi.string().required(),
        size: Joi.string().required(),
      }).required()
    )
    .required(),
  sample: Joi.object({
    src: Joi.string(),
    id: Joi.string(),
  }),
}).required();

const isValidUpdateOrderItem = (data = []) =>
  updateOrderItemSchema.validateAsync(data, {
    abortEarly: false,
  });
// isValidUpdateOrderItem([
//   {
//     connection: 'down',
//   },
// ]);
export default {
  // newOrderValidation,
  newOrderItemValidation,
  isValidUpdateOrderItem,
  joiNewOrderValidation,
};
