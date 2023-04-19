import mg from 'mongoose';
import config from '../config/config.mjs';

export default mg.model(
  'InputField',
  new mg.Schema({
    fieldGroup: {
      unique: true,
      type: String,
      required: [true, 'Group Name is mandatory!'],
      trim: true,
    },
    fields: [
      {
        // __v: false,
        label: {
          type: String,
          required: [true, 'Field field is mandatory!'],
          unique: true,
          trim: true,
        },
        name: {
          type: String,
          required: [true, 'Field name is mandatory!'],
          unique: true,
          trim: true,
        },
        type: { type: String, default: 'text' },
        sl_id: {
          type: String,
          required: [true, 'Field sl id is mandatory!'],
          // unique: true,
          trim: true,
        },
        template: {
          type: String,
          // required: [true, 'Measurement template is mandatory!'],
        },
        status: {
          type: String,
          enum: config.MEASUREMENT_STATUS,
          default: 'ACTIVE',
        },
        validation: String,
        options: Array,
        params: String,
        placeholder: String,
        icon: {
          _id: false,
          id: String,
          src: String,
        },
      },
    ],
    status: { type: Boolean },
  })
);
