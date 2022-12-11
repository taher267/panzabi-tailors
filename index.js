import { config } from 'dotenv';
config({ path: './config/.env' });
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './typedefs/typeDefs2.js';
import contexts from './context/contexts.js';
import db from './config/db.js';
import auth from './auth/auth.js';
const publicRoutes = ['userLogin', 'userSignup', '/'];
// console.log(publicRoutes.indexOf('userLogin'));
const PORT = process.env.PORT || 4000;
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
    // console.log(req.body);
    return { ...contexts, req, res, cuttentUser, isAuthorized };
  },
  // csrfPrevention: true,
  // cors: {
  //   origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  // },
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});
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
