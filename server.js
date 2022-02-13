import express from "express";
import { ApolloServer } from "apollo-server-express";
import fetch from 'node-fetch';
import cors from 'cors';

if (!global.fetch) {
	global.fetch = fetch;
}

import { db } from "./db.js";
import { typeDefs } from "./src/schemas.js";
import { resolvers } from "./src/resolvers.js";

const app = express();
app.use(cors())

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
         headers: req.headers,
         db
      };
    }
 });
  await server.start()

  const port = 4012
  server.applyMiddleware({ app, path: '/' });
  await new Promise(resolve => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);
}

startApolloServer(typeDefs, resolvers);
