"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

import { Button, Form } from "react-bootstrap";
import { logIn, logOut, toggleModerator } from "../redux/features/authSlice";

export default function LogIn() {
  // This is where the data gets pulled in. Also, types declared earlier
  // gets used here.
  const dispatch = useDispatch<AppDispatch>();

  // The user can only toggle isModerator if they are logged in.
  // To do this, you need to use the useAppSelector hook
  const auth = useAppSelector((state) => state.authReducer.value.isAuth);

  // State for the username
  const [username, setUsername] = useState<string>("");

  const handleLogIn = () => {
    dispatch(logIn(username));
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleModerator = () => {
    dispatch(toggleModerator());
  };
  return (
    <div>
      <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
      <Button onClick={handleLogIn}>Log In</Button>
      <Button onClick={handleLogOut}>Log out</Button>
      {auth && <Button onClick={handleModerator}>Toggle Moderator</Button>}
    </div>
  );
}
