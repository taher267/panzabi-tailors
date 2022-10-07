export const registerFields = (watch) => [
  {
    label: 'Full Name',
    name: 'name',
    validation: { required: true },
    placeholder: 'Enter customer full name...',
    defaultError: `Name is mandartory!`,
  },
  {
    label: 'Username',
    name: 'username',
    validation: { required: true, pattern: /^[a-z][a-z0-9]+$/ },
    placeholder: 'Enter username...',
    defaultError: `Username is mandartory!`,
  },
  {
    label: 'Phone No',
    name: 'phone_no',
    placeholder: 'valid phone number',
    defaultError: `Phone is mandatory!`,
    validation: { required: true, pattern: /01[1-9]\d{8}/ },
  },
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    placeholder: 'valid email address',
    defaultError: `Valid email is mandatory!`,
    validation: {
      required: true,
      pattern: /^([a-z])+\.?([0-9]+)?[^\.]@([a-z]\.?)+[^\.]$/,
    },
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    validation: {
      required: true,
    },
    placeholder: 'Enter strong password',
    defaultError: `Password is mandatory!`,
  },
  {
    label: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
    validation: {
      required: true,

      validate: (val) => {
        if (watch('password') && watch('password') !== val)
          return 'Your passwords do no match';
      },
    },
    placeholder: 'Enter confirm password...',
    defaultError: `Confirm password is mandatory!`,
  },
];
