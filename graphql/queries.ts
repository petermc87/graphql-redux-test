import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  # Paste the query function from Apollo server GUI.
  query Query {
    authors {
      id
      name
      numberOfNovels
      novels {
        id
        title
        image
        introduction
        publisher
        authorId
      }
    }
  }
`;
