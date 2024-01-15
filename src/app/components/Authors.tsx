"use client";

import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../../../graphql/queries";

type Author = {
  id: String;
  name: String;
  novels: [];
  numberOfNovels: 0;
};

type Novel = {
  authorId: String;
  id: String;
  image: String;
  introduction: String;
  title: String;
};

export default function Authors() {
  // useQuery is a react hook that works in conjuction with GraphQl.
  const { data } = useQuery(GET_AUTHORS);
  return (
    <>
      {data &&
        data.authors.map((author: Author) => {
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
