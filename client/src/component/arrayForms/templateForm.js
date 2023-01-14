export default [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Enter name...',
    rules: {
      required: { value: true, message: `Template name is mandatory!` },
    },
    fullWidth: true,
  },
  {
    label: 'Template Body',
    name: 'templateBody',
    placeholder: 'Enter template body...',
    rules: {
      required: { value: true, message: `Template body is mandatory!` },
    },
    fullWidth: true,
    multiline: true,
    minRows: 5,
  },

  [
    {
      label: 'Where do you want to place on tempate body',
      name: 'productsPlace.placeOnBody',
      placeholder: 'Enter place on body..',
    },
    {
      label: 'Where place in tag',
      name: 'productsPlace.placeOn',
      placeholder: 'Enter place on..',
    },

    {
      label: 'Product Tag',
      name: 'productsPlace.singleItemWrapper',
      placeholder: 'Enter product tag..',
    },
  ],
  [
    {
      label: 'Where do you want to place on tempate body',
      name: 'measurementsPlace.placeOnBody',
      placeholder: 'Enter place on body..',
    },

    {
      label: 'Where place in tag',
      name: 'measurementsPlace.placeOn',
      placeholder: 'Enter place on..',
    },
    {
      label: 'Measurement Tag',
      name: 'measurementsPlace.singleItemWrapper',
      placeholder: 'Enter measurement tag..',
    },
    {
      label: 'Measurement replaced By',
      name: 'measurementsPlace.replasedBy',
      placeholder: 'Enter product tag..',
      type: 'select',
      options: ['label', 'msr_id'],
    },
  ],
  [
    {
      label: 'Where do you want to place on tempate body',
      name: 'designsPlace.placeOnBody',
      placeholder: 'Enter place on body..',
    },
    {
      label: 'Where place in tag',
      name: 'designsPlace.placeOn',
      placeholder: 'Enter place on..',
    },
    {
      label: 'Design Tag',
      name: 'designsPlace.singleItemWrapper',
      placeholder: 'Enter design tag..',
    },
    {
      label: 'Design replaced By',
      name: 'designsPlace.replasedBy',
      placeholder: 'Enter product tag..',
      type: 'select',
      options: ['label', 'dsn_id'],
    },
  ],
];
