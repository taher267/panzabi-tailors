import mg from 'mongoose';

export default mg.model(
  'DailyAccount',
  new mg.Schema(
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      type: {
        type: String,
        required: [true, 'Type is mandatory!'],
        trim: true,
      },
      purpose: {
        type: String,
        required: [true, 'Purpose is mandatory!'],
        trim: true,
      },
      cash_in: {
        type: Number,
        default: 0,
        trim: true,
      },
      cash_out: {
        type: Number,
        trim: true,
        default: 0,
      },
      name: {
        type: String,
        trim: true,
      },
      comment: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
