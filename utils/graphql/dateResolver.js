import { GraphQLScalarType } from 'graphql';
import moment from 'moment';
export const dateResolver = new GraphQLScalarType({
  name: 'Date',
  //   value receive form client
  //   Mutation
  parseValue(value) {
    return value;
  },
  //   value send to the client
  //   queries
  serialize(value) {
    return moment(value).format('YYYY-MM-DD');
  },
});

export default new GraphQLScalarType({
  name: 'DateTime',
  //   value receive form client
  //   Mutation
  parseValue(value) {
    return value;
  },
  //   value send to the client
  //   queries
  serialize(value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  },
});
