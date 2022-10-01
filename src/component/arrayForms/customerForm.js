export const newCustomerFields = [
  {
    label: 'Customer name',
    name: 'name',
    validation: { required: true },
    placeholder: 'Enter customer full name...',
    defaultError: `Name is mandartory!`,
  },
  {
    label: 'Customer Phone number',
    name: 'phone_no',
    validation: { required: true, pattern: /^01([0-9]){9}$/ },
    placeholder: 'Enter customer full name...',
    defaultError: `Phone number is mandartory!`,
  },
  {
    label: 'Customer Email address',
    name: 'email',
    type: 'email',
    placeholder: 'valid email address',
    defaultError: `Provide a valid email!`,
  },
  {
    label: 'Customer address',
    name: 'address',
    type: 'address',
    placeholder: 'Enter customer email address',
  },
];

export const newCustomerTransportFields = [
  {
    label: 'ডেলিভারি মাধ্যম',
    name: 'transport_name',
    validation: { required: true },
    placeholder: 'Enter customer transport name...',
    defaultError: `Transport name is mandartory!`,
  },
  {
    label: 'Transport charge',
    name: 'transport_charge',
    type: 'number',
    validation: { required: true },
    placeholder: 'transport charge',
    defaultError: `Transport chagre is mandartory!`,
  },
  {
    name: 'receiver_address',
    label: 'Receiver address',
    placeholder: 'Receiver address',
    defaultError: `Receiver address is mandartory!`,
    validation: { required: true },
  },
  {
    validation: { required: true },
    label: 'Receiver phone',
    name: 'receiver_phone',
    defaultError: `Receiver phone is mandartory!`,
    placeholder: 'Enter receiver phone number',
  },
];
