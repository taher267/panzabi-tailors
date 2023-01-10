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
    temp: { type: String, required: [true, 'Template is required'] },
    productsPlace: {
      tag: { type: String, required: true },
      placeOn: { type: String, required: true },
      replaceOn: { type: String, required: true },
    },
  })
);
