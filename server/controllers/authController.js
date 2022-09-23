import bcrypt from 'bcrypt';
// bcrypt
//   .hash('12345678', 10)
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));

import errorHandler from '../utils/errorHandler.js';
import authValidation from '../validation/authValidation.js';
import userValidation from '../validation/userValidation.js';
import userServices from '../services/userCustomerServices.js';
import { UserInputError } from 'apollo-server';
import getJWT from '../utils/getJWT.js';
import { errorFormat } from '../../client/src/component/utils/errorConv.js';
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
      // console.log(user);

      if (!user)
        throw new UserInputError(
          `Wrong credentials!`,
          errorFormat(`invalid credentials`)
        );

      if (!user?.roles.includes('ADMIN')) {
        throw new UserInputError(`Wrong credentials!`, {
          errors: {
            success: false,
            message: `invalid credentials`,
          },
        });
      }

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
      const user = await userServices.createUser(register);
      return { token: getJWT(user.id) };
    } catch (e) {
      errorHandler(e);
    }
  },
};
