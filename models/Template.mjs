import mg from 'mongoose';
export default mg.model(
  'Template',
  new mg.Schema({
    name: {
      unique: true,
      type: String,
      required: [true, 'Name is mandatory!'],
      trim: true,
    },
    templateBody: { type: String, required: [true, 'Template is required'] },
    productsPlace: {
      singleItemWrapper: { type: String, required: true },
      placeOn: { type: String, required: true },
      replaceOn: { type: String, required: true },
    },
    measurementsPlace: {
      singleItemWrapper: { type: String, required: true },
      placeOn: { type: String, required: true },
      replaceOn: { type: String, required: true },
    },
    designsPlace: {
      singleItemWrapper: { type: String, required: true },
      placeOn: { type: String, required: true },
      replaceOn: { type: String, required: true },
    },
  })
);
