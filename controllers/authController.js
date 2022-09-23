import bcrypt from 'bcrypt';
// bcrypt
//   .hash('12345678', 10)
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));

import errorHandler from '../utils/errorHandler.js';
import authValidation from '../validation/authValidation.js';
import userValidation from '../validation/userValidation.js';
import userServices from '../services/userCustomerServices.js';
import { UserInputError } from 'apollo-server-core';
import getJWT from '../utils/getJWT.js';
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
        'password'
      );

      if (!user)
        throw UserInputError(`Wrong credentials!`, {
          errors: {
            success: false,
            message: `invalid credentials`,
          },
        });
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        throw new UserInputError(`Wrong credentials!`, {
          errors: {
            success: false,
            message: `invalid credentials`,
          },
        });
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
      // const { username, password } = register;
      const user = await userServices.createUser(register);
      return { token: getJWT(user.id) };
    } catch (e) {
      errorHandler(e);
    }
  },
};
