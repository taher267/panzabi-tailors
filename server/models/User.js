import mg from 'mongoose';

export default mg.model(
  'User',
  new mg.Schema(
    {
      name: { type: String, required: [true, 'Name is mandatory!'] },
      phone_no: {
        type: String,
        required: [true, 'Phone no is mandatory!'],
        unique: true,
      },
      password: String,
      status: {
        type: String,
        enum: ['ACTIVE', 'PENDING', 'REJECT'],
        default: 'ACTIVE',
      },
      roles: { type: Array, default: 'customer' },
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
        location: String,
        delivery_phone: String,
      },
      nodes: String,
    },
    { timestamps: true }
  )
);
