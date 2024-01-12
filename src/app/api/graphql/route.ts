import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "../../../../graphql/resolvers";
import { typeDefs } from "../../../../graphql/typeDefs";

// Prisma instance.
import prisma from "../../../../prisma/db";

// We have to declare the type as the types in the prisma
// client.
export type Context = {
  prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});

export { handler as GET, handler as POST };
