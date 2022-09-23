export const measuementFields = [
  {
    label: 'Measurement name',
    name: 'name',
    validation: { required: true },
    placeholder: 'Enter measurement name...',
    defaultError: `Name is mandartory!`,
  },
  {
    label: 'Serial id',
    name: 'sl_id',
    type: 'number',
    validation: { required: true, pattern: /[0-9]+$/ },
    placeholder: 'Enter Serial id...',
    defaultError: `Serial id is mandartory!`,
  },
  //   {
  //     label: 'Symbol/Icon',
  //     name: 'icon',
  //     type: 'file',
  //   },
];
