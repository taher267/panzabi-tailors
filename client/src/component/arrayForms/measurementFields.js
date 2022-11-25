export const measuementFields = [
  {
    label: 'Label',
    name: 'label',
    validation: 'required→Label is mandartory!',
    placeholder: 'Enter measurement label...',
  },
  {
    label: 'Measurement name',
    name: 'name',
    validation:
      'required→Measurement is mandartory!∂pattern→^[A-Za-z_]+$←Name should be Aa to Zz without space!',
    placeholder: 'Enter measurement name...',
    defaultError: `Name is mandartory!`,
  },
  {
    label: 'Type',
    name: 'type',
    type: 'single_select',
    options: [
      'text',
      'single_select',
      'multi_select',
      'textarea',
      'checkbox',
      'radio',
    ],
  },
  {
    label: 'Serial id',
    name: 'sl_id',
    type: 'number',
    validation:
      'required→Serial Id is mandartory!∂pattern→[1-9][0-9]*←Serial id should be number without space!',
    //valueAsNumber→true←nothing∂
    // validation: { required: true, pattern: /^[0-9]+$/ },
    placeholder: 'Enter Serial id...',
  },
  {
    label: 'Template Name',
    name: 'template',
    validation: `required→Valid template id is mandartory!∂pattern→^[a-zA-Z0-9-]*$←Serial id should be alphanumeric`,
    // validation: { required: true, pattern: // },
    placeholder: 'Enter Serial id...',
    defaultError: ``,
  },
  {
    label: 'Status',
    name: 'status',
    type: 'single_select',
    options: ['ACTIVE', 'DEACTIVE'],
    validation: 'required→Status is mandatrory!',
  },
  // {
  //   label: 'Template desc',
  //   name: 'desc',
  //   type: 'textarea',
  //   validation: { required: true, pattern: /[a-zA-Z0-9]+$/ },
  //   placeholder: 'Enter Serial id...',
  //   defaultError: `Valid template id is mandartory!`,
  //   style: { background: 'transparent', color: '#030303' },
  //   minRows: 3,
  // },

  {
    label: 'Validation /required→true←message∂',
    name: 'validation',
    // validation: `pattern→[^\&part;]$←Invalid last character, please remove &part;`,
    placeholder:
      'errorName→errorValue←errorMessage∂errorName→errorValue←errorMessage',
  },
  {
    label: 'Placeholder',
    name: 'placeholder',
    placeholder:
      'errorName→errorValue←errorMessage∂errorName→errorValue←errorMessage',
  },
  {
    label: 'Options',
    name: 'options',
    placeholder: 'a|b|c',
  },
  {
    label: 'Params →∂←',
    name: 'params',
    placeholder: 'params',
  },
];
