import bcrypt from 'bcrypt';
// bcrypt
//   .hash('12345678', 10)
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));

import errorHandler from '../utils/errorHandler.mjs';
import authValidation from '../validation/authValidation.mjs';
import userValidation from '../validation/userValidation.mjs';
import userServices from '../services/userCustomerServices.mjs';
import { UserInputError } from 'apollo-server';
import getJWT from '../utils/getJWT.mjs';

import errorFormater from '../utils/errorFormater.mjs';

export default {
  login: async (parent, { credentials }, { req, res }) => {
    try {
      await authValidation.authValidation(credentials);
      const { username, password } = credentials;
      const user = await userServices.findUser(
        'single',
        {
          $or: [{ username }, { phone_no: username }, { email: username }],
        },
        'password roles'
      );
      if (!user)
        throw new UserInputError(
          `Wrong credentials!`,
          errorFormater(`invalid credentials 😈`)
        );
      // Password check
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        throw new UserInputError(
          `Wrong credentials!`,
          errorFormater(`invalid credentials 😈`)
        );
      // Authorization check
      if (!user?.roles.includes('ADMIN')) {
        throw new UserInputError(
          `Unauthorized!`,
          errorFormater(`Unauthorized to access this resource 😈`)
        );
      }
      // return token with credientials
      return { token: getJWT(user.id) };
    } catch (e) {
      errorHandler(e);
    }
  },
  signup: async (parent, { register }, { req, res }) => {
    try {
      await userValidation.newUserValidation({
        ...register,
        passwordCheck: true,
      });
      const user = await userServices.createUser(register);
      return { token: user?.getJWToken() };
    } catch (e) {
      errorHandler(e);
    }
  },
};
