"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

import { Button, Form } from "react-bootstrap";
import { logIn } from "../redux/features/authSlice";

export default function LogIn() {
  // This is where the data gets pulled in. Also, types declared earlier
  // gets used here.
  const dispatch = useDispatch<AppDispatch>();

  // State for the username
  const [username, setUsername] = useState<string>("");

  const handleLogIn = () => {
    dispatch(logIn(username));
  };

  return (
    <div>
      <Form onSubmit={handleLogIn}>
        <Form.Group>
          <Form.Control
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleLogIn}>Log In</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
