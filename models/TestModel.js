import mg from 'mongoose';
export default mg.model(
  'TestModel',
  new mg.Schema(
    {
      strData: String,
      arrData: [
        {
          name: String,
          arr: Array,
        },
      ],
    },
    { timestamps: true }
  )
);
