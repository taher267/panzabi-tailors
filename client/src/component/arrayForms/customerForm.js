const EMAI_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const pattern = {
  value: /^\S/,
  message: `Provide valid data input without starting white space!`,
};
export const newCustomerFields = [
  {
    label: 'Customer name',
    name: 'name',
    validation: {
      required: { value: true, message: `Name is mandartory!` },
      pattern,
      minLength: { value: 4, message: `Name at least 4 chars!` },
    },
    placeholder: 'Enter customer full name...',
  },
  {
    label: 'Customer Phone number',
    name: 'phone_no',
    validation: {
      required: { value: true, message: `Phone number is mandartory!` },
      pattern: { value: /^01([0-9]){9}$/, message: `Invalid phone no!` },
    },
    placeholder: 'Enter customer full name...',
  },
  {
    label: 'Customer Email address',
    name: 'email',
    type: 'email',
    placeholder: 'Valid email address',
    validation: {
      pattern: { value: EMAI_REGEX, message: 'Provide a valid email!' },
    },
  },
  {
    label: 'Customer address',
    name: 'address',
    type: 'address',
    placeholder: 'Enter customer email address',
    validation: {
      pattern,
    },
    multiline: true,
    minRows: 4,
  },
];

export const newCustomerTransportFields = [
  {
    label: 'ডেলিভারি মাধ্যম',
    name: 'transportation.transport_name',
    validation: {
      required: { value: true, message: `What is the trasnport name!` },
      pattern,
    },
    placeholder: 'Enter customer transport name...',
    // defaultError: `Transport name is mandartory!`,
  },
  // {
  //   label: 'Transport charge',
  //   name: 'transportation.transport_charge',
  //   type: 'number',
  //   validation: { required: true },
  //   placeholder: 'transport charge',
  //   defaultError: `Transport chagre is mandartory!`,
  // },
  {
    validation: { required: true },
    label: 'Receiver phone',
    name: 'transportation.receiver_phone',
    validation: {
      required: { value: true, message: `Receiver phone is mandartory!` },
      pattern: { value: /^01([0-9]){9}$/, message: `Invalid phone no!` },
    },
    placeholder: 'Enter receiver phone number',

    // itemProps: {
    // },
  },
  {
    name: 'transportation.receiver_address',
    label: 'Receiver address',
    placeholder: 'Receiver address',
    // defaultError: ``,
    validation: {
      required: { value: true, message: 'Receiver address is mandartory!' },
      pattern,
    },
    multiline: true,
    minRows: 4,
  },
];
