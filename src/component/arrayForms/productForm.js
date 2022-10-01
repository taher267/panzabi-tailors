export const productFields = [
  {
    label: 'Product name',
    name: 'name',
    validation: { required: true },
    placeholder: 'Enter product name...',
    defaultError: `Name is mandartory!`,
  },
  // {
  //   label: 'category',
  //   name: 'Category',
  //   type: 'string',
  //   validation: { required: true },
  //   placeholder: 'Enter Serial id...',
  //   defaultError: `Serial id is mandartory!`,
  // },
  {
    label: 'Product Description',
    name: 'description',
    placeholder: 'Enter product description...',
  },
  {
    label: 'Price',
    name: 'price',
    type: 'number',
    min: 0,
    validation: { pattern: /[0-9]+$/ },
    placeholder: 'Enter Serial id...',
    defaultError: `Product price should be number(0-9)!`,
  },
];

export const measuementItemsFields = [
  [
    {
      label: 'Measurement Id',
      name: 'ms_id',
      type: 'string',
      validation: { required: true },
      placeholder: 'Enter Measurement id...',
      defaultError: `ms_id is mandartory!`,
    },
    {
      label: 'Item Name',
      name: 'item_name',
      type: 'string',
      validation: { required: true },
      placeholder: 'Enter Measurement item name...',
      defaultError: `Measurenent item is mandartory!`,
    },
    {
      label: 'Item measures',
      name: 'measures',
      type: 'string',
      validation: { required: true },
      placeholder: 'Enter item measures...',
      defaultError: `Measurenent item measures is mandartory!`,
    },
  ],
];
