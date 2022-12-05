import mg from 'mongoose';
import config from '../config/config.js';

export default mg.model(
  'Measurement',
  new mg.Schema({
    __v: false,
    label: {
      type: String,
      required: [true, 'Measurement field is mandatory!'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Measurement name is mandatory!'],
      unique: true,
      trim: true,
    },
    type: { type: String, default: 'text' },
    sl_id: {
      type: String,
      required: [true, 'Measurement sl id is mandatory!'],
      unique: true,
      trim: true,
    },
    template: {
      type: String,
      required: [true, 'Measurement sl id is mandatory!'],
    },
    status: {
      type: String,
      enum: config.MEASUREMENT_STATUS,
      default: 'ACTIVE',
    },
    validation: String,
    options: String,
    params: String,
    placeholder: String,
    icon: {
      _id: false,
      id: String,
      src: String,
    },
  })
);
