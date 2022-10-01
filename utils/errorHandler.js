import { UserInputError } from 'apollo-server-core';

export default (e) => {
  console.log(e.message);
  throw new UserInputError(e.message, {
    errors: e?.extensions?.errors || { success: false, message: e.message },
  });
};
