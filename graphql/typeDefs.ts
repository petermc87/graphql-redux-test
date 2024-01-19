import gql from "graphql-tag";

// NOTE: We declare the data models then the specific queries (GET requests).
// We will get all the novels.
// Next, we will provide mutations (POST, DELETE and PUT requests)
// This will only consist of the current novel in question.
//
// DEFINITION: typeDefs is where the Schema and REST type
// requests are performed (i.e. GET, POST, PUT, DELETE.)

export const typeDefs = gql`
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
    # Author Mutations
    newAuthor(name: String, numberOfNovels: Int): Author
    updateAuthor(id: ID!, name: String, numberOfNovels: Int): Author
    deleteAuthor(id: ID!): Author
    # Novel Mutations
    addNovel(
      authorId: ID!
      title: String
      image: String
      introduction: String
      publisher: String
    ): Novel
    deleteNovel(id: ID!): Novel
  }
`;
