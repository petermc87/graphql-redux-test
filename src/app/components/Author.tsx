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
  // --- STATE VARIABLES --- //

  // Show state for edit entry
  const [edit, setEdit] = useState(false);

  // State for the name and numberOfNovels, separate.
  const [authorState, setAuthorState] = useState<AuthorTypes | null>(null);

  // --- MUTATIONS --- //
  const [deleteAuthor, { data, loading, error }] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [GET_AUTHORS, "GetAuthors"],
  });

  // Call the useMutation hook to pass in UPDATE_AUTHOR parser
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [GET_AUTHORS, "GetAuthors"],
  });

  // --- HANDLER FUNCTIONS --- //
  const handleDelete = (e: any, AuthorId: string) => {
    e.preventDefault();

    if (loading) return <p>Delete...</p>;
    if (error) return <p>Error deleting Author</p>;

    deleteAuthor({ variables: { id: AuthorId } });
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Author Mutation
    updateAuthor({
      variables: {
        id: author.id,
        numberOfNovels: authorState?.numberOfNovels,
        name: authorState?.name,
      },
    });
  };

  return (
    <Container>
      {edit && authorState ? (
        <Form
          onSubmit={(e) => {
            setEdit(false);
            handleUpdate(e);
          }}
        >
          <Form.Group>
            Name:{" "}
            <Form.Control
              value={authorState.name}
              placeholder="edit name"
              onChange={(e) => {
                setAuthorState({
                  ...authorState,
                  name: e.target.value,
                });
              }}
            />
            Number of Novels:{" "}
            <Form.Control
              value={authorState.numberOfNovels}
              placeholder="edit number of novels"
              onChange={(e) => {
                // IMPORTANT :First, we have to parse the inputvalue to a number, because
                // it is a string by default.
                const numOfNovelsInput = parseInt(e.target.value);

                // IMPORTANT: A checker for successful parsing needs to be defined here.
                if (!isNaN(numOfNovelsInput)) {
                  setAuthorState({
                    ...authorState,
                    numberOfNovels: numOfNovelsInput,
                  });
                }
              }}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      ) : (
        <>
          Name: <h3>{author.name}</h3>
          Number of Novels: <div>{author.numberOfNovels}</div>
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
          // Button will either open or close the edit fields.
          if (edit === false) {
            setEdit(true);
            setAuthorState(author);
          } else {
            setEdit(false);
            setAuthorState(null);
          }
        }}
      >
        Edit
      </Button>
    </Container>
  );
}
