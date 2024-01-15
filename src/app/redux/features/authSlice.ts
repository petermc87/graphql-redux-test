// A slice will be a current state of a variable (for example), that can
// be passed to other components without props drilling.
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Create a type for 'value' object in the initialState instance below.
type initialStateType = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  isModerator: boolean;
};

const initialState: initialStateType = {
  // The value is the login details for the user.
  value: {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false,
  },
};
export const auth = createSlice({
  name: "auth",
  initialState,
  // Gets a state and action and changes someting in state.
  reducers: {
    // This will return the userState back to the inital state.
    logOut: () => {
      return initialState;
    },
    // Takes in the login user into the LogIn function below via the
    // action arguement.
    // NOTE: The username is only being passed into the payload, hence why the
    // paylod action is a <string>
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: "na",
          isModerator: false,
        },
      };
    },
    toggleModerator: (state) => {
      state.value.isModerator = !state.value.isModerator;
    },
  },
});

// To use these functions elsewhere, you have to use auth.actions
export const { logIn, logOut, toggleModerator } = auth.actions;

// Export the reducer
export default auth.reducer;
