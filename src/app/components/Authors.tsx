"use client";

import { useQuery } from "@apollo/client";
import { Novel } from "@prisma/client";
import { GET_AUTHORS } from "../../../graphql/queries";
import { AuthorTypes } from "../../../typings";

export default function Authors() {
  // useQuery is a react hook that works in conjuction with GraphQl.
  const { data, loading, error } = useQuery(GET_AUTHORS);

  // Checking if there is data being retrieved. In either case, a message
  // will be displayed to the screen.
  if (loading) return <p>Loading ...</p>;
  else if (error) return <p>Oops! Something went wrong</p>;
  return (
    <>
      {data &&
        data.authors.map((author: AuthorTypes) => {
          return (
            <>
              <h1>{author.name}</h1>
              <div>{author.numberOfNovels}</div>
              {author.novels.map((novel: Novel) => {
                return (
                  <>
                    <div>Novel Title: {novel.title}</div>
                    <p>Introduction: {novel.introduction}</p>
                  </>
                );
              })}
            </>
          );
        })}
    </>
  );
}
