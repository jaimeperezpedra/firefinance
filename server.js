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

server.start().then(res => {
  const port = 4012
  server.applyMiddleware({ app });
  app.listen({ port }, () => {
    console.log(`Server has started 🚀 http://localhost:${port}/graphql`);
  });
});
