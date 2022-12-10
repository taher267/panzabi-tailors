import { AuthenticationError } from 'apollo-server-core';
import errorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import userServices from '../services/userCustomerServices.js';
import config from '../config/config.js';
import { checkAdmin } from '../utils/checkRoles.js';
import errorFormater from '../utils/errorFormater.js';

export default {
  userAuthorization: async (req) => {
    try {
      if (!req?.headers?.authorization)
        throw new AuthenticationError(`Please login to access the resources!`);
      const token =
        req?.headers?.authorization?.split(`Bearer `)?.[1] ||
        req?.headers?.authorization;
      if (!token)
        throw new AuthenticationError(`Please login to access the resources!`);
      const decoted = jwt.verify(token, config.JWT_SECRET.trim());
      if (!decoted)
        throw new AuthenticationError(
          `Invalid/ expired credientials!`,
          errorFormater(`Provide valid credientils! `)
        );
      const user = await userServices.findUser('_id', decoted.id);
      if (!user)
        throw new AuthenticationError(
          `Something going worng!`,
          errorFormater(`Could be internal issue! 😧`)
        );

      if (!checkAdmin(user.roles))
        throw new AuthenticationError(
          `Unauthorized!`,
          errorFormater(`User should be proper authorization`)
        );
      req.user = user;
      return user;
    } catch (e) {
      console.log(e.message);
      errorHandler(e);
    }
  },
};
