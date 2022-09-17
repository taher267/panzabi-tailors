import mg from 'mongoose';

export default mg.model(
  'Order',
  new mg.Schema(
    {
      order_no: {
        type: Number,
        required: [true, 'Order Number is mandatory!'],
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
      orders: [
        {
          order: {
            type: mg.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          price: { type: Number, required: true },
          measurements: [
            {
              _id: { type: mg.Types.ObjectId, required: true },
              size: { type: String, required: true },
            },
          ],
          designs: Array,
        },
      ],
    },
    { timestamps: true }
  )
);
