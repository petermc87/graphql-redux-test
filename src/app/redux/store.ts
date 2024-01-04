import { configureStore } from "@reduxjs/toolkit";
// Import the reducer from the authSlice
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./features/authSlice";
export const store = configureStore({
  // A reducer takes a previous state (actions or variables), makes some changes to that
  // state and returns the new state.
  reducer: {
    // Pass the import to the store.
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Setting a type in the store to be declared elsewhere.
export type AppDispatch = typeof store.dispatch;

// Create a type in store to remove the type error in page.tsx for useSelector state.
// We need to show that the type is a selector hook that takes is coming from the
// RootState.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
