import mg from 'mongoose';
import moment from 'moment';
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
        type: String,
      },
      totalQty: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      advanced: { type: Number, default: 0 },
      due: { type: Number, default: 0 },
      transport_charge: { type: Number, default: 0 },
      customer: {
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
          products: [
            {
              _id: {
                type: mg.Types.ObjectId,
                ref: 'Product',
                required: true,
              },
              name: {
                type: String,
                required: true,
              },
            },
          ],
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
          measurements: [
            {
              _id: false,
              msr_id: { type: String, required: true },
              // msr_id: { type: mg.Types.ObjectId, required: true },
              size: { type: String, required: true },
              label: { type: String, required: true },
            },
          ],
          designs: [
            {
              _id: false,
              group: {
                type: mg.Types.ObjectId,
                ref: 'Design',
                required: true,
              },
              items: [
                {
                  _id: false,
                  dsn_id: { type: mg.Types.ObjectId, required: true },
                  // ref: 'Design',
                  desc: String,
                },
              ],
            },
          ],
          user: [
            {
              _id: false,
              type: mg.Types.ObjectId,
              ref: 'User',
              required: true,
            },
          ],
          sample: {
            _id: false,
            id: String,
            src: String,
          },
          order_date: {
            type: Date,
            default: moment().format('YYYY-MM-DD'),
          },
        },
      ],
      delivery_date: {
        type: Date,
        required: [true, 'Delivery date is mandatory!'],
      },
    },

    { timestamps: true }
  )
);
// export default orderModel;

// console.log();
