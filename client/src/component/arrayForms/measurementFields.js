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
export const measuementInputFields = {
  label: {
    label: 'Label',
    // name: 'label',
    validation: 'required→Label is mandartory!',
    placeholder: 'Enter measurement label...',
  },
  name: {
    label: 'Input name',
    // name: 'name',
    // validation:'required→Measurement is mandartory!∂pattern→^[A-Za-z_]+$←Name should be Aa to Zz without space!',
    rules: { required: { value: true, message: `Input is mandartory!` } },
    placeholder: 'Enter measurement name...',
  },
  type: {
    label: 'Type',
    // name: 'type',
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
  sl_id: {
    label: 'Serial id',
    // name: 'sl_id',
    type: 'number',
    validation:
      'required→Serial Id is mandartory!∂pattern→[1-9][0-9]*←Serial id should be number without space!',
    //valueAsNumber→true←nothing∂
    // validation: { required: true, pattern: /^[0-9]+$/ },
    placeholder: 'Enter Serial id...',
  },
  template: {
    label: 'Template Name',
    // name: 'template',
    validation: `required→Valid template id is mandartory!∂pattern→^[a-zA-Z0-9-]*$←Serial id should be alphanumeric`,
    // validation: { required: true, pattern: // },
    placeholder: 'Enter Serial id...',
    defaultError: ``,
  },
  status: {
    label: 'Status',
    // name: 'status',
    type: 'single_select',
    options: ['ACTIVE', 'DEACTIVE'],
    validation: 'required→Status is mandatrory!',
  },

  // name: {
  //   label: 'Validation /required→true←message∂',
  //   // name: 'validation',
  //   // validation: `pattern→[^\&part;]$←Invalid last character, please remove &part;`,
  //   placeholder:
  //     'errorName→errorValue←errorMessage∂errorName→errorValue←errorMessage',
  // },
  placeholder: {
    label: 'Placeholder',
    // name: 'placeholder',
    placeholder:
      'errorName→errorValue←errorMessage∂errorName→errorValue←errorMessage',
  },
  options: {
    label: 'Options',
    // name: 'options',
    placeholder: 'a|b|c',
  },
  params: {
    label: 'Params →∂←',
    // name: 'params',
    placeholder: 'params',
  },
};
export const InputFieldValidation = {
  label: {
    rules: { required: true, message: 'Label is mandartory!' },
    placeholder: 'Enter input label...',
  },
  name: {
    rules: {
      required: { value: true, message: `Name is mandartory!` },
      pattern: {
        value: /^[A-Za-z_]+$/,
        message: `Name should be Aa to Zz without space!`,
      },
    },
    placeholder: 'Enter field name...',
  },
  type: {
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
  sl_id: {
    label: 'Serial id',
    // name: 'sl_id',
    type: 'number',
    rules: {
      required: { value: true, message: `Serial Id is mandartory!` },
      pattern: {
        value: /[0-9]+$/,
        message: `Serial id should be number without space!`,
      },
    },

    placeholder: 'Enter Serial id...',
  },
  template: {
    rules: {
      required: { value: true, message: `Valid template id is mandartory` },
      pattern: {
        value: /^[a-zA-Z0-9-]+$/,
        message: `Template should be alphanumeric without white space!`,
      },
    },
    // validation: { required: true, pattern: // },
    placeholder: 'Enter Serial id...',
  },
  status: {
    type: 'single_select',
    options: ['ACTIVE', 'DEACTIVE'],
    validation: 'required→Status is mandatrory!',
    rules: {
      required: { value: true, message: `Status is mandatrory!` },
    },
  },
  options: {
    placeholder: 'Write and hit enter key!',
  },
  params: {
    placeholder: 'Params →∂←',
  },
  validation: {
    placeholder:
      'required→Field is mandartory!∂pattern→^[A-Za-z_]+$←Name should be Aa to Zz without ',
  },
  placeholder: {
    placeholder: 'Write input placeholder',
  },
  icon: {
    placeholder: `{"id":"....","src":"...."}`,
    rules: {
      pattern: {
        value:
          /^{"id":"[\w\-\.\d+]*","src":"(https?:\/\/)?(www\.)?[\w\-\:\.\/\&\%\d+]*"}$/,
        message: `Invalid, please follow this {"id":"anyunique-id-without-white-space","src":"https://localhsot"}`,
      },
    },
  },
};
