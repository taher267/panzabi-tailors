import DateTimeResolver, {
  dateResolver,
} from '../utils/graphql/dateResolver.mjs';
import userCustomerServices from '../services/userCustomerServices.mjs';
import errorHandler from '../utils/errorHandler.mjs';

const customerDetail = async ({ customer: id }, args, c) => {
  try {
    const customer = await userCustomerServices.findUser(
      '_id',
      id,
      'name phone_no email address order_status transportation'
    );
    return customer;
  } catch (e) {
    errorHandler(e);
  }
};

export default {
  Date: dateResolver,
  DateTime: DateTimeResolver,
  Customer: {
    user: async ({ user }) => {
      console.log(user, 'user/customer');
      try {
        return await userCustomerServices.findUser('_id', user);
      } catch (e) {
        errorHandler(e);
      }
    },
  },
  Order: {
    customerDetail,
  },
  Orders: {
    customerDetail,
  },
};
