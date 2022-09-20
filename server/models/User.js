import mg from 'mongoose';

export default mg.model(
  'User',
  new mg.Schema(
    {
      name: {
        type: String,
        minlength: 4,
        required: [true, 'Name is mandatory!'],
      },
      username: {
        type: String,
        minlength: 5,
      },
      phone_no: {
        type: String,
        required: [true, 'Phone no is mandatory!'],
        unique: true,
      },
      password: { type: String, select: false },
      engage: [String],
      user: {
        type: mg.Types.ObjectId,
        ref: 'User',
      },
      orders: [
        {
          type: mg.Types.ObjectId,
          ref: 'Order',
        },
      ],
      thirdPirty: [
        {
          _id: false,
          via3rd: { type: Boolean, default: false },
          name: String,
          token: String,
          token_secret: String,
          client_id: String,
        },
      ],
      status: {
        type: String,
        enum: ['ACTIVE', 'PENDING', 'REJECT'],
        default: 'ACTIVE',
      },
      roles: { type: Array, default: 'CUSTOMER' },
      order_status: {
        type: String,
        enum: ['COMPLETED', 'ALTER', 'PROCESSING', 'NEW'],
        default: 'NEW',
      },
      email: String,
      address: String,
      delivery_detail: {
        delivery_by: String,
        delivery_charge: Number,
        delivery_address: String,
        delivery_phone: String,
      },
      notes: String,
    },
    { timestamps: true }
  )
);
