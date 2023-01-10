import mg from 'mongoose';
import { AuthenticationError, UserInputError } from 'apollo-server-core';
import dailyAccountValidation from '../validation/dailyAccountValidation.mjs';
import errorHandler from '../utils/errorHandler.mjs';
import dailyAccountServices from '../services/dailyAccountServices.mjs';

export default {
  /**
   * Create New DailyAccount
   */
  createDailyAccount: async (_parent, { account }, _context) => {
    try {
      await dailyAccountValidation.newDailyAccountValidation(account);
      const newDailyAccount = await dailyAccountServices.createDailyAccount(
        account
      );
      return newDailyAccount;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * All DailyAccounts
   */
  allAccounts: async (_parent, { key, value }, _context) => {
    try {
      const filter = key && value ? { [key]: value } : {};
      const all = await dailyAccountServices.findDailyAccount(filter);
      return all;
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Single DailyAccount
   */
  getDailyAccount: async (_parent, { key, value }, { isAuthorized }) => {
    try {
      if (!isAuthorized) throw AuthenticationError(`Unauthorized user!`);
      if (key === 'id' && !mg.isValidObjectId(value))
        throw new UserInputError(`Invalid id, get ${value}`);
      return await dailyAccountServices.findDailyAccount(key, value);
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Create New DailyAccount
   */
  updateDailyAccount: async (_parent, { _id, update }, _context) => {
    try {
      if (typeof _id === 'string' && !mg.isValidObjectId(_id)) {
        throw new UserInputError(`Invalid update id`);
      }
      await dailyAccountValidation.newDailyAccountValidation(update);
      const updated = await dailyAccountServices.dailyAccountUpdate(
        _id,
        update,
        {
          new: true,
        }
      );
      return {
        ...update,
        _id,
      };
    } catch (e) {
      errorHandler(e);
    }
  },
  /**
   * Delete DailyAccount
   */
  deleteDailyAccount: async (_parent, { _id }) => {
    try {
      if (!mg.isValidObjectId(_id))
        throw new UserInputError(`Invalid delete id`);
      const del = '';
      // await DailyAccount.deleteOne({ _id });
      console.log(_id);
      // return del.deletedCount;
      return true;
    } catch (e) {
      errorHandler(e);
    }
  },
};

// DailyAccount.create({
//   name: 'body',
// })
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));
