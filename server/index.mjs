import { config } from 'dotenv';
config({ path: './config/.env' });
import { ApolloServer } from 'apollo-server';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
// import {
//   constraintDirectiveTypeDefs,
//   createApolloQueryValidationPlugin,
//   createEnvelopQueryValidationPlugin,
// } from 'graphql-constraint-directive';
// import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from './resolvers/resolvers.mjs';
import typeDefs from './typedefs/typeDefs.mjs';
import contexts from './context/contexts.mjs';
import db from './config/db.mjs';
import auth from './auth/auth.mjs';
// import verifyToken from './middlewire/verifyToken.mjs';

const publicRoutes = ['userLogin', 'userSignup', '/'];
// console.log(publicRoutes.indexOf('userLogin'));
const PORT = process.env.PORT || 4000;
// let schema = makeExecutableSchema({
//   typeDefs: [constraintDirectiveTypeDefs, typeDefs],
// });

// const plugins = [
//   createApolloQueryValidationPlugin({
//     schema,
//   }),
// ];
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    const { req, ...rest } = ctx;
    let user = null,
      isAuthorized = false;
    try {
      // const authHeader = req.headers.authorization ?? '';
      // if (authHeader) {
      //   const token = authHeader.split('Bearer ')[1];
      //   const payload = await verifyToken.verifyToken(token);
      // }
      /**
    *  let cuttentUser = null,
      isAuthorized = false;
    if (publicRoutes.indexOf(req?.body?.operationName) === -1) {
      const user = await auth.userAuthorization(req);
      req.user = user;
      cuttentUser = user;
      isAuthorized = true;
    }
    // console.log(req.body);
    return { ...contexts, req, res, cuttentUser, isAuthorized };
    */
    } catch (e) {
      console.log(e);
    }
    return { req, ...rest, auth: { user, isAuthorized } };
  },
});
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  db()
    .then((d) => {
      console.log(d.connection.host);
      return server.listen(PORT).then(({ url }) => {
        console.log(
          `Alhamdu lillah, 🚀 mongodb connected also Server ready at ${url}`
        );
      });
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
} else {
  db()
    .then((d) => {
      // console.log(d.connection);
      return server.listen(PORT).then(({ url }) => {
        console.log(
          `Alhamdu lillah, 🚀 mongodb connected also Server ready at ${url}`
        );
      });
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
}
// const exp = /\{[^}]*\}}/g;
// let str = `abcd,{{-ABC-}}efgh,{{-ABC-}},fjsdkfjakfds,,{{-ABC-}}`;

// console.log(str.replace(exp, ''));

// console.log(/[^\∂]$/.test('ফদজকজফকদজফদ9434384←∂'));

// +
// let rex = 'pattern→/[A-Z]/←Invalid chars A-Z!';
// let newarr = rex.split(/→|←/);
// let validation = {
//   required: 'true',
//   pattern: /[A-Z]/,
// };
// const reg = new RegExp(`[^∂]$`);
// let s = `required→true←Label is mandartory!∂`;
// console.log('jfdjfdksj∂'.match(reg));
