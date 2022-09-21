import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './typedefs/typeDefs.js';
import contexts from './context/contexts.js';
import db from './config/db.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => {
    const { req, res } = ctx;
    // console.log(ctx);
    return { ...contexts, req, res };
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
