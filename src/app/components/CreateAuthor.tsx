"use client";

import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { NEW_AUTHOR } from "../../../graphql/mutations";

export default function Authors() {
  // State for holding the author name and
  // NOTE: we don'd need a state for numberOfNovels input. We set it to 0
  // as default. In the future: SET THE DEFAULT TO 0!!!
  const [nameState, setNameState] = useState("");
  const [newAuthor] = useMutation(NEW_AUTHOR, {
    variables: { name, numberOfNovels },
  });

  // Handle resetting of author state.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Condition that will show text if nothing is entered on submit.
    if (nameState === "") return alert("Please enter a name");

    newAuthor({ variables: {nameState, 0} })
    setNameState("");
    // TODO: Handle the case for submitting the the backend.
  };
  return (
    <>
      <Container>Create an Author</Container>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={nameState}
              onChange={(e) => setNameState(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
}
