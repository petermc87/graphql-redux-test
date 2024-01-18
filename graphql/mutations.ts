import { gql } from "@apollo/client";

export const NEW_AUTHOR = gql`
  mutation Mutation($name: String, $numberOfNovels: Int) {
    newAuthor(name: $name, numberOfNovels: $numberOfNovels) {
      id
      name
      numberOfNovels
      novels {
        id
        title
        introduction
        image
        authorId
        publisher
      }
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation Mutation($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      numberOfNovels
      novels {
        title
        id
        image
        introduction
        publisher
        authorId
      }
    }
  }
`;
