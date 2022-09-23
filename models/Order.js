import mg from 'mongoose';

export default mg.model(
  'Order',
  new mg.Schema(
    {
      order_no: {
        type: String,
        required: [true, 'Order Number is mandatory!'],
        unique: [true, 'Please provide a unique Order no'],
      },
      previous_order: {
        type: Number,
      },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      discunt: { type: Number, default: 0 },
      advanced: { type: Number, default: 0 },
      user: {
        type: mg.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      order_status: {
        type: String,
        enum: ['COMPLETED', 'ALTER', 'PROCESSING', 'NEW'],
        default: 'NEW',
      },
      order_items: [
        {
          order: {
            type: mg.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          price: { type: Number, required: true },
          measurements: [
            {
              _id: false,
              msr_id: { type: mg.Types.ObjectId, required: true },
              size: { type: String, required: true },
            },
          ],
          designs: [
            {
              _id: false,
              dsn_id: { type: mg.Types.ObjectId, required: true },
              desc: { type: String, required: true },
            },
          ],
          sample: {
            _id: false,
            id: String,
            src: String,
          },
        },
      ],
    },
    { timestamps: true }
  )
);