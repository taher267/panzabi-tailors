import moment from 'moment';
import { DATE } from '../../utils/index';

export const orderBasicFields = [
  {
    defaultValue: moment().format(DATE),
    label: 'Order date',
    type: 'date',
    name: 'order_date',
    validation: { required: true },
    defaultError: `Order date is mandatory!`,
  },
  {
    label: 'Order number',
    name: 'order_no',
    validation: { required: true },
    placeholder: 'Enter order number...',
    defaultError: `Order number is mandatory!`,
  },
  {
    label: 'Previouse Number',
    name: 'previous_order',
    placeholder: 'Enter previous number...',
  },
  {
    label: 'Delivery date',
    name: 'delivery_date',
    type: 'date',
    validation: { required: true },
    defaultValue: moment().add(10, 'd').format(DATE),
    defaultError: `Delivery date is mandatory!`,
  },
];
export const orderPricingFields = [
  {
    label: 'Quantity',
    name: 'quantity',
    type: 'number',
    min: 0,
    validation: { required: true, pattern: /[0-9]+$/, min: 1 },
    placeholder: 'Quantity...',
    defaultError: `Quantity (0-9)!`,
  },
  {
    label: 'Price',
    name: 'price',
    type: 'number',
    min: 0,
    validation: { required: true, pattern: /[0-9]+$/, min: 1 },
    placeholder: 'Price...',
    defaultError: `Price (0-9)!`,
  },
  // {
  //   label: 'Discunt',
  //   name: 'discunt',
  //   type: 'number',
  //   min: 0,
  //   validation: { pattern: /[0-9]+$/, min: 0 },
  //   placeholder: 'Discunt...',
  //   defaultError: `Discunt (0-9)!`,
  // },
  // {
  //   label: 'Advanced',
  //   name: 'advanced',
  //   type: 'number',
  //   validation: { pattern: /[0-9]+$/, min: 0 },
  //   placeholder: 'Advanced...',
  //   defaultError: `Advanced (0-9)!`,
  // },
  // {
  //   label: 'Transport Charge',
  //   name: 'transport_charge',
  //   type: 'number',
  //   validation: { pattern: /[0-9]+$/, min: 0 },
  //   placeholder: 'Transport Charge...',
  //   defaultError: `Transport Charge (0-9)!`,
  // },
];

export const orderUpMeasurementFields = [
  {
    label: 'Long',
    name: 'long',
    validation: { required: true },
    placeholder: 'Enter order number...',
    defaultError: `Order number is mandatory!`,
  },
  [
    {
      label: 'Body',
      name: 'body',
      placeholder: 'Body...',
    },
    {
      label: 'Body Loose',
      name: 'body_loose',
      placeholder: 'Body...',
    },
    {
      label: 'Belly',
      name: 'belly',
      placeholder: 'Belly...',
    },
    {
      label: 'Belly Loose',
      name: 'belly_loose',
      placeholder: 'Belly...',
    },
  ],
  {
    label: 'Sholder',
    name: 'sholder',
    validation: { required: true },
    placeholder: 'Sholder...',
    defaultError: `Sholder is mandatory`,
  },
  {
    label: 'Sleeve',
    name: 'sleeve',
    placeholder: 'Sleeve...',
    defaultError: `Sleeve`,
  },
  {
    label: 'Coller/কলার',
    name: 'coller',
    placeholder: 'কলার...',
  },
  {
    label: 'Sleeve cuff',
    name: 'sleeve_cuff',
    placeholder: 'Sleeve cuff...',
    defaultError: `Sleeve cuff`,
  },
];

export const orderDownMeasurementFields = [
  {
    label: 'Length',
    name: 'length',
    validation: { required: true },
    placeholder: 'Enter order number...',
    defaultError: `Order number is mandatory!`,
  },

  {
    label: 'Anklet cuff',
    name: 'anklet_cuff',
    placeholder: 'Anklet cuff...',
    defaultError: `Anklet cuff`,
  },
  {
    label: 'হাই/Waist to Crotch',
    name: 'waist_to_crotch',
    validation: { required: true },
    placeholder: 'Waist to crotch/হাই...',
    defaultError: `Waist to Crotch is mandatory`,
  },
  {
    label: 'Waist/কোমর',
    name: 'waist',
    validation: { required: true },
    placeholder: 'Waist...',
    defaultError: `Waist is mandatory`,
  },
  {
    label: 'Thigh/উরু/রান',
    name: 'thigh',
    validation: { required: true },
    placeholder: 'thigh/উরু/রান...',
    defaultError: `Thigh is mandatory`,
  },

  {
    label: 'Hips',
    name: 'hips',
    placeholder: 'hips/উরু/রান...',
  },
];

export const OrderStatusField = {
  label: 'Order Status',
  name: 'order_status',
  type: 'number',
  options: ['COMPLETED', 'ALTER', 'PROCESSING', 'NEW'],
  validation: { required: true },
  defaultError: `Order status is mandatory`,
};
export const OrderPricingField = [
  {
    label: 'Transport Charge',
    name: 'transport_charge',
    type: 'number',
    validation: { pattern: /[0-9]+$/, min: 0 },
    placeholder: 'Transport Charge...',
    defaultError: `Transport Charge (0-9)!`,
  },
];
