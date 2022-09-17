import mg from 'mongoose';
export default mg.model(
  'Design',
  new mg.Schema({
    name: {
      type: String,
      required: [true, 'Name is mandatory!'],
      unique: true,
    },
    designs: [
      {
        item: {
          type: String,
          minLength: 4,
          required: [true, 'Item is mandatory!'],
          unique: true,
        },
        _id: {
          type: Number,
          required: [true, 'Serial is mandatory'],
          unique: true,
        },
        icon: {
          _id: String,
          src: String,
        },
      },
    ],
    type: { type: Number, required: [true, 'Type is mandatory!'] },
  })
);
