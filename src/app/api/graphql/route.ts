import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import gql from "graphql-tag";
import prisma from "../../../../prisma/db";
// // We have to declare the type as the types in the prisma
// // client.
export type Context = {
  prisma: PrismaClient;
};
// NOTE: We declare the data models then the specific queries (GET requests).
// We will get all the novels.
// Next, we will provide mutations (POST, DELETE and PUT requests)
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
    author(id: ID!): Author
    authors: [Author]
  }

  type Mutation {
    newAuthor(name: String, numberOfNovels: Int): Author
    updateAuthor(id: ID!, name: String): Author
    deleteAuthor(id: ID!): Author
    addNovel(authorId: ID!, title: String, image: String, introduction: String, publisher: String)
  }
`;

// DEFINITION: Resolvers are CRUD functions.
const resolvers = {
  // Args will be the arguements passed into the query above.
  // Ex.: if it was written above as:
  //  type Query {
  //    novel(id: ID) : Novel
  //    novel: [Novel]
  //  }
  // args will can be used to access the id: ID above.
  //
  //IMPORTANT: GET requests matching typeDefs above
  Query: {
    // NOTE: Query matching 'authors' in typeDefs above. This gets ALL novels.
    authors: async (parent: any, args: any, context: Context) => {
      try {
        const authors = await context.prisma.author.findMany();
        // Returns an empty array if 'null'.
        return authors || [];
      } catch (error) {
        console.error("Error fetching authors", error);
        throw new Error("Unable to fetch authors");
      }
    },
    // NOTE: Query matching 'author'. This gers ONE novel.
    author: async (parent: any, args: any, context: Context) => {
      // IMPORTANT: We are taking in the id from the args param because
      // it is the original Query.
      try {
        const author = await context.prisma.author.findUnique({
          where: {
            id: args.id,
          },
        });
        return author;
      } catch (error) {
        console.error("Error fetching author", error);
        throw new Error("Unable to fetch author");
      }
    },
  },

  //IMPORTANT: We query author again to get the novels contained within it.
  Author: {
    novels: async (parent: any, args: any, context: Context) => {
      try {
        // NOTE: To get novels created by a specific author, you have
        // to match the authorId in Novel with the author object passed in.
        // IMPORTANT: This object is the 'parent' which is passed from either the 'authors' or 'author' above,
        // (hence parent.id below), depending on which one you're querying.
        const novels = await context.prisma.novel.findMany({
          where: {
            authorId: parent.id,
          },
        });
        return novels || [];
      } catch (error) {
        console.error("Error fetching novels", error);
        // This will throw a JSON error in addition to
        // a console error above.
        throw new Error("Unable to fetch novels.");
      }
    },
  },
  // NOTE: Mutations are CUD part of CRUD operations!
  Mutation: {
    newAuthor: async (parent: any, args: any, context: Context) => {
      try {
        const newAuthor = await context.prisma.author.create({
          data: {
            name: args.name,
            numberOfNovels: args.numberOfNovels,
          },
        });
        return newAuthor;
      } catch (error) {
        console.error("Error creating new author", error);
        throw new Error("Unable to create author");
      }
    },
    updateAuthor: async (parent: any, args: any, context: Context) => {
      try {
        const updatedAuthor = await context.prisma.author.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
          },
        });
        return updatedAuthor;
      } catch (error) {
        console.error("The author could not be updated");
        throw new Error("Unable to update Auhtor");
      }
    },
    deleteAuthor: async (parent: any, args: any, context: Context) => {
      try {
        const deletedAuthor = await context.prisma.author.delete({
          where: {
            id: args.id,
          },
        });
        return deletedAuthor;
      } catch (error) {
        console.error("Unable to delete author", error);
        throw new Error("Error deleting author");
      }
    },
    addNovel: async (parent: any, args: any, context: Context) => {},
  },
};

const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});

export { handler as GET, handler as POST };
