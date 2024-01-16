"use client";

import { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function Authors() {
  // State for holding the author name and
  // NOTE: we don'd need a state for numberOfNovels input. We set it to 0
  // as default. In the future: SET THE DEFAULT TO 0!!!
  const [name, setName] = useState("");

  // Handle resetting of author state.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Condition that will show text if nothing is entered.
    if (name === "") return alert("Please enter a name");
    setName("");
    // TODO: Handle the case for submitting the the backend.
  };
  return (
    <>
      <Container>Create an Author</Container>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control type="input" placeholder="Enter" />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
}

// --> ADD THIS TO AN AUTHOR DISPLAY COMPONENT <-- //
// {data &&
//   data.authors.map((author: AuthorTypes) => {
//     return (
//       <>
//         <h1>{author.name}</h1>
//         <div>{author.numberOfNovels}</div>
//         {author.novels.map((novel: Novel) => {
//           return (
//             <>
//               <div>Novel Title: {novel.title}</div>
//               <p>Introduction: {novel.introduction}</p>
//             </>
//           );
//         })}
//       </>
//     );
//   })}
