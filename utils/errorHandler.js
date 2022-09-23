import { UserInputError } from 'apollo-server-core';

export default (e) => {
  throw new UserInputError(e.message, {
    errors: e?.extensions?.errors || { success: false, message: e.message },
  });
};
