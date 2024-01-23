"use client";

import { useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";
import { GET_AUTHORS } from "../../../graphql/queries";
import { AuthorTypes } from "../../../typings";
import DisplayAuthor from "./Author";

export default function DisplayAuthors() {
  // useQuery is a react hook that works in conjuction with GraphQl.
  const { data, loading, error } = useQuery(GET_AUTHORS);

  // Checking if there is data being retrieved. In either case, a message
  // will be displayed to the screen.
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Oops! Something went wrong</p>;

  // Create the list of items to be returned.
  const authorList = data.authors.map((author: AuthorTypes) => {
    return <DisplayAuthor key={author.id} author={author} />;
  });

  // Pass the list into a Boostrap container.
  return <Container>{authorList}</Container>;
}
