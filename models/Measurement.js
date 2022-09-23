import mg from 'mongoose';

export default mg.model(
  'Measurement',
  new mg.Schema({
    name: {
      type: String,
      required: [true, 'Measurement name is mandatory!'],
      unique: true,
      trim: true,
    },
    sl_id: {
      type: String,
      required: [true, 'Measurement sl id is mandatory!'],
      unique: true,
      trim: true,
    },
    icon: {
      _id: false,
      id: String,
      src: String,
    },
  })
);
