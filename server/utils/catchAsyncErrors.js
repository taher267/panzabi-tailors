import { UserInputError } from 'apollo-server-core';
export default (theFunc) => (parent, args, context) =>
  Promise.resolve(theFunc(parent, args, context)).catch(
    (e) => new UserInputError(e)
  );
