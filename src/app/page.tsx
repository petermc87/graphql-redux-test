"use client";

// Import the useAppSelector typed for the store variables.
import LogIn from "./components/Login";
import { useAppSelector } from "./redux/store";

export default function Home() {
  // This is where the state is assigned to a variable to it can be used
  // in the app.
  const username = useAppSelector((state) => state.authReducer.value.username);

  console.log(username);
  return (
    <div>
      <LogIn />
      <p>Username: {username}</p>
    </div>
  );
}
