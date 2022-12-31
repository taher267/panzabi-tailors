import { UserInputError } from 'apollo-server-core';
import { GraphQLError } from 'graphql';

export default (e) => {
  console.log(e.message);
  throw new GraphQLError(e.message, {
    errors: e?.extensions?.errors || { success: false, message: e.message },
    extensions: { status: e?.status || 500 },
  });

  // throw new UserInputError(e.message, {
  //   errors: e?.extensions?.errors || { success: false, message: e.message },
  // });
};
