// We only need to import the context here.
//
// IMPORTANT NOTE: The prisma client is accessed via the Context
// object defined in the api/graphql/route.ts. This is why its possible
// to perform the context.prisma below.
import { Context } from "@/app/api/graphql/route";

// DEFINITION: Resolvers are CRUD functions.
export const resolvers = {
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
    addNovel: async (parent: any, args: any, context: Context) => {
      try {
        const newNovel = await context.prisma.novel.create({
          data: {
            authorId: args.authorId,
            title: args.title,
            image: args.image,
            introduction: args.introduction,
            publisher: args.publisher,
          },
        });
        return newNovel;
      } catch (error) {
        console.error("The new novel could not be created", error);
        throw new Error("Error creating new novel");
      }
    },
    deleteNovel: async (parent: any, args: any, context: Context) => {
      try {
        const deletedNovel = await context.prisma.novel.delete({
          where: {
            id: args.id,
          },
        });
        return deletedNovel;
      } catch (error) {
        console.error("Unable to delete novel", error);
        throw new Error("Error when deleting novel");
      }
    },
  },
};
