import mg from 'mongoose';
export default mg.model(
  'Design',
  new mg.Schema({
    design_name: {
      unique: true,
      type: String,
      required: [true, 'Name is mandatory!'],
      trim: true,
    },
    designs: [
      {
        item: {
          type: String,
          minLength: 4,
          required: [true, 'Item is mandatory!'],
          unique: true,
        },
        ds_id: {
          type: Number,
          required: [true, 'Serial is mandatory'],
          // unique: true,
        },
        icon: {
          _id: String,
          src: String,
        },
      },
    ],
    type: { type: [String], required: [true, 'Type is mandatory!'] },
    status: { type: Boolean },
  })
);
