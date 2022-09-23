import mg from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
const userSchema = new mg.Schema(
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
    transportation: {
      transport_name: String,
      transport_charge: Number,
      receiver_address: String,
      receiver_phone: String,
    },
    notes: String,
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  if (!this.password) return next();
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(11);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.getJWToken = function () {
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
};
export default mg.model('User', userSchema);
