import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  // A reducer takes a previous state (actions or variables), makes some changes to that
  // state and returns the new state.
  reducer: {},
});
