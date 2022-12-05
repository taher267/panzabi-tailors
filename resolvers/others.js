import DateTimeResolver, {
  dateResolver,
} from '../utils/graphql/dateResolver.js';
import userCustomerServices from '../services/userCustomerServices.js';
import errorHandler from '../utils/errorHandler.js';

export default {
  Date: dateResolver,
  DateTime: DateTimeResolver,
  Customer: {
    user: async ({ user }, args, c) => {
      try {
        return await userCustomerServices.findUser('_id', user);
      } catch (e) {
        errorHandler(e);
      }
    },
  },
  Order: {
    // customer: async ({ user: id }, args, c) => {
    customer: async ({ customer: id }, args, c) => {
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
    },
  },
};
