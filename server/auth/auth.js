import { AuthenticationError } from 'apollo-server-core';
import errorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import userServices from '../services/userCustomerServices.js';
import config from '../config/config.js';

export default {
  userAuthorization: async (req) => {
    try {
      // console.log(req?.headers?.authorization);
      if (!req?.headers?.authorization)
        throw new AuthenticationError(`Please login to access the resources!`);
      const token =
        req?.headers?.authorization?.split(`Bearer `)?.[1] ||
        req?.headers?.authorization;
      if (!token)
        throw new AuthenticationError(`Please login to access the resources!`);
      const decoted = jwt.verify(token, config.JWT_SECRET.trim());
      if (!decoted)
        throw new AuthenticationError(`Invalid/ expired credientials!`);
      const user = await userServices.findUser('id', decoted.id);
      if (!user) throw AuthenticationError(`User not found!`);
      req.user = user;
      return user;
    } catch (e) {
      console.log(e.message);
      errorHandler(e);
    }
  },
};
