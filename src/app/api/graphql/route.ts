import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import gql from "graphql-tag";

// We have to declare the type as the types in the prisma
// client.
export type Context = {
  prisma: PrismaClient;
};
// NOTE: We declare the data models then the specific queries (GET requests).
// We will get all the novels.
// Next, we will provide mutations (POST and PUT requests)
// This will only consist of the current novel in question.
//
// DEFINITION: typeDefs is where the Schema and REST type
// requests are performed (i.e. GET, POST, PUT, DELETE.)

const typeDefs = gql`
  type Novel {
    id: ID!
    title: String
    image: String
    introduction: String
    publisher: String
    authorId: String
  }

  type Author {
    id: ID!
    name: String
    numberOfNovels: Int
    novels: [Novel]
  }

  type Query {
    authors: [Author]
  }
`;

// DEFINITION: Resolvers are CRUD functions.
const resolvers = {
  Query: {
    // Args will be the arguements passed into the query above.
    // Ex.: if it was written above as:
    //  type Query {
    //    novel(id: ID) : Novel
    //    novel: [Novel]
    //  }
    // args will can be used to access the id: ID above.
    authors: async (parent: any, args: any, context: Context) => {
      // Api call to the backend.
      return await context.prisma.author.findMany();
    },
  },
};

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
