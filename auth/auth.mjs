import { AuthenticationError } from 'apollo-server-core';
import errorHandler, { AuthErr } from '../utils/errorHandler.mjs';
import jwt from 'jsonwebtoken';
import userServices from '../services/userCustomerServices.mjs';
import config from '../config/config.mjs';
import { checkAdmin } from '../utils/checkRoles.mjs';
import errorFormater from '../utils/errorFormater.mjs';

export default {
  userAuthorization: async (req) => {
    try {
      if (!req?.headers?.authorization)
        throw new AuthenticationError(`Please login to access the resources!`);
      const token =
        req?.headers?.authorization?.split(`Bearer `)?.[1] ||
        req?.headers?.authorization;
      if (!token)
        throw new AuthenticationError(
          'Unauthenticated!',
          errorFormater(`Please login to access the resources! 😧`, 403)
        );
      const decoted = jwt.verify(token, `${config.JWT_SECRET.trim()}`);
      if (!decoted)
        throw new AuthenticationError(
          `Invalid/ expired credientials!`,
          errorFormater(`Provide valid credientils!`)
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
      if (e?.extensions) throw AuthErr(e);
      else if (e?.message === 'jwt expired')
        throw new AuthenticationError(
          `Unauthorized!`,
          errorFormater(`User should be proper authorization`, 403)
        );
      errorHandler(e);
    }
  },
};
