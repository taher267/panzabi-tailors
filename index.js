import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './typedefs/typeDefs.js';
import contexts from './context/contexts.js';
import db from './config/db.js';
import auth from './auth/auth.js';
const publicRoutes = ['userLogin', 'getCustomer'];
// console.log(publicRoutes.indexOf('userLogin'));
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    const { req, res } = ctx;
    let cuttentUser = null,
      isAuthorized = false;

    if (publicRoutes.indexOf(req?.body?.operationName) === -1) {
      const user = await auth.userAuthorization(req);
      req.user = user;
      cuttentUser = user;
      isAuthorized = true;
    }
    return { ...contexts, req, res, cuttentUser, isAuthorized };
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

db.then(() =>
  server.listen(4000).then(({ url }) => {
    console.log(
      `Alhamdu lillah, 🚀 mongodb connected also Server ready at ${url}`
    );
  })
).catch((e) => {
  console.log(e);
  process.exit(1);
});
