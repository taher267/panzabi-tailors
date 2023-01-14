import mg from 'mongoose';
export default mg.model(
  'Template',
  new mg.Schema({
    name: {
      unique: true,
      enum: ['up', 'down'],
      type: String,
      required: [true, 'Name is mandatory!'],
      trim: true,
    },
    templateBody: { type: String, required: [true, 'Template is required'] },
    productsPlace: {
      singleItemWrapper: String,
      placeOn: String,
      placeOnBody: String,
    },
    measurementsPlace: {
      singleItemWrapper: String,
      placeOn: String,
      placeOnBody: String,
      replasedBy: String,
    },
    designsPlace: {
      singleItemWrapper: String,
      placeOn: String,
      placeOnBody: String,
      replasedBy: String,
    },
  })
);
