import mg from 'mongoose';

export default mg.model(
  'Measurement',
  new mg.Schema({
    name: {
      type: String,
      required: [true, 'Measurement field is mandatory!'],
      unique: true,
    },
    icon: {
      _id: String,
      src: String,
    },
  })
);
