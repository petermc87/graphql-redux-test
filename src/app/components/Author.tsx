import { useMutation } from "@apollo/client";
import { Novel } from "@prisma/client";
import { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { DELETE_AUTHOR, UPDATE_AUTHOR } from "../../../graphql/mutations";
import { GET_AUTHORS } from "../../../graphql/queries";
import { AuthorTypes } from "../../../typings";
import DisplayNovel from "./Novel";

type Props = {
  author: AuthorTypes;
};

export default function Author({ author }: Props) {
  const [deleteAuthor, { data, loading, error }] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [GET_AUTHORS, "GetAuthors"],
  });

  // Call the useMutation hook to pass in UPDATE_AUTHOR parser
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [GET_AUTHORS, "GetAuthors"],
  });

  const handleDelete = (e: any, AuthorId: string) => {
    e.preventDefault();

    if (loading) return <p>Delete...</p>;
    if (error) return <p>Error deleting Author</p>;

    deleteAuthor({ variables: { id: AuthorId } });
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Show state for edit entry
  const [edit, setEdit] = useState(false);

  return (
    <Container>
      {edit ? (
        <Form>
          <Form.Group>
            Name: <Form.Control placeholder="edit name" />
            Number of Novels:{" "}
            <Form.Control placeholder="edit number of novels" />
          </Form.Group>
        </Form>
      ) : (
        <>
          <h3>{author.name}</h3>
          <div>{author.numberOfNovels}</div>
        </>
      )}

      {author.novels.map((novel: Novel) => {
        return <DisplayNovel key={novel.id} novel={novel} />;
      })}
      <Button
        onClick={(e) => {
          handleDelete(e, author.id);
        }}
      >
        Delete
      </Button>
      <Button
        onClick={() => {
          if (edit === false) {
            setEdit(true);
          } else {
            setEdit(false);
          }
        }}
      >
        Edit
      </Button>
    </Container>
  );
}
