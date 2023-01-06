import mg from 'mongoose';

export default mg.model(
  'Product',
  new mg.Schema({
    name: {
      type: String,
      required: [true, 'Name is mandatory!'],
      unique: true,
      trim: true,
    },

    description: String,
    measurementItem: [
      {
        _id: false,
        ms_id: {
          type: Number,
          // required: [true, `Measurement serial id is mandatory!`],
          // unique: true,
        },
        item_name: {
          type: String,
          // unique: true,
          // required: [true, 'Measurement Item is mandatory!'],
        },
        measures: String,
      },
    ],
    category: { type: String, required: true, trim: true },
    price: Number,
  })
);