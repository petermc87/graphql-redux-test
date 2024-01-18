import { useMutation } from "@apollo/client";
import { Novel } from "@prisma/client";
import { Button, Container } from "react-bootstrap";
import { DELETE_AUTHOR } from "../../../graphql/mutations";
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

  const handleDelete = (e: any, AuthorId: string) => {
    e.preventDefault();

    if (loading) return <p>Delete...</p>;
    if (error) return <p>Error deleting Author</p>;

    deleteAuthor({ variables: { id: AuthorId } });
  };

  return (
    <Container>
      <h3>{author.name}</h3>
      <div>{author.numberOfNovels}</div>
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
    </Container>
  );
}
