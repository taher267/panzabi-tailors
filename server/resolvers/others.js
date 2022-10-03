import DateTimeResolver, {
  dateResolver,
} from '../utils/graphql/dateResolver.js';
import userController from '../controllers/userController.js';
export default {
  Date: dateResolver,
  DateTime: DateTimeResolver,
  Customer: {
    user: async ({ user: id }, args, c) =>
      await userController.getUser(
        null,
        {
          key: '_id',
          value: id,
        },
        c
      ),
  },
};
