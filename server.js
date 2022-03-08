import express from "express";
import { ApolloServer } from "apollo-server-express";
import fetch from 'node-fetch';
import cors from 'cors';

if (!global.fetch) {
	global.fetch = fetch;
}

import { typeDefs } from "./src/schemas.js";
import { resolvers } from "./src/resolvers.js";
import dataSources from './src/data-sources/index.js';

const app = express();
app.use(cors())

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: ({ req }) => {
      return {
         headers: req.headers,
      };
    }
 });
  await server.start()

  const port = 4012
  server.applyMiddleware({ app, path: '/' });
  app.listen({ port });
  console.log(`🚀 Server ready at http://localhost:${port}`);
}

startApolloServer(typeDefs, resolvers);
