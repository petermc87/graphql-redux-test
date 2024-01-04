"use client";

// Import the useAppSelector typed for the store variables.
import LogIn from "./components/Login";
import { useAppSelector } from "./redux/store";

export default function Home() {
  // This is where the state is assigned to a variable to it can be used
  // in the app. We will do this for username
  const username = useAppSelector((state) => state.authReducer.value.username);

  // Store the state of the isModeratore variable
  const moderator = useAppSelector(
    (state) => state.authReducer.value.isModerator
  );

  return (
    <div>
      <LogIn />
      <p>Username: {username}</p>
      <p>isModerator: {moderator && <p>This user is a moderator.</p>}</p>
    </div>
  );
}
