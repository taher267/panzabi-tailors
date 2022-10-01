import moment from 'moment';
export const dailyAccountFields = (watch, resetField) => [
  {
    label: 'Date',
    name: 'date',
    type: 'date',
    format: 'yyyy-MM-dd',
    validation: { required: true },
    defaultValue: moment().format('YYYY-MM-DD'),
    defaultError: `Date is mandartory!`,
  },
  {
    label: 'Type',
    name: 'type',
    validation: { required: true },
    defaultError: `Type is mandartory!`,
  },
  {
    label: 'Purpose/Detail',
    name: 'purpose',
    type: 'textarea',
    validation: { required: true },
    defaultError: `Purpose is mandartory!`,
  },
  {
    label: 'Comment',
    name: 'comment',
    type: 'textarea',
    defaultError: `Comment is mandartory!`,
  },
  {
    label: 'Cash In',
    name: 'cash_in',
    type: 'number',
    validation: {
      validate: (val) => {
        const look = watch('cash_out');
        if ((!look || look === 0) && !val) return `Cash In is mandartory!`;
        else if (!look) resetField('cash_out');
      },
    },
    defaultError: `cash in is mandartory!`,
  },
  {
    label: 'Cash Out',
    name: 'cash_out',
    type: 'number',
    validation: {
      validate: (val) => {
        const look = watch('cash_in');
        if ((!look || look === 0) && !val) return `Cash out is mandartory!`;
        else if (!look) resetField('cash_in');
      },
    },
    defaultError: `Cash out is mandartory!`,
  },
  {
    label: 'Name',
    name: 'name',
    validation: { required: true },
    defaultError: `Name is mandartory!`,
  },
];
