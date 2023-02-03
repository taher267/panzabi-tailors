import { AuthenticationError, UserInputError } from 'apollo-server-core';
import { GraphQLError } from 'graphql';

export default (e) => {
  console.log(e.message, '======errorHandler.mjs=====');
  console.log(e?.extensions?.errors);
  throw new GraphQLError(e.message, {
    errors: e?.extensions?.errors || { success: false, message: e.message },
    extensions: { status: e?.status || e?.extensions?.status || 500 },
  });
  // throw new UserInputError(e.message, {
  //   errors: e?.extensions?.errors || { success: false, message: e.message },
  // });
};

export const InputErr = (e) => {
  console.log(e.message);
  console.log(e?.extensions?.errors);

  throw new UserInputError(e?.message, {
    errors: e?.extensions?.errors || e?.message,
    success: false,
    status: e?.extensions?.status || 500,
  });
};

export const AuthErr = (e) => {
  console.log(e.message);
  console.log(e?.extensions?.errors);

  throw new AuthenticationError(e?.message, {
    errors: e?.extensions?.errors || e?.message,
    success: false,
    status: e?.extensions?.status || 500,
  });
};
