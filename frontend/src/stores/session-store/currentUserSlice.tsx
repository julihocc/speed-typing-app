import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createCurrentUserSlice: StateCreator<
  SessionStore,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  CurrentUserSlice
> = (set) => ({
  currentUserEmail: null,
  currentUserIsAuthenticated: false,
  passwordError: null,
  setCurrentUserEmail: (email) =>
    set((state) => {
      state.currentUserEmail = email;
      return state;
    }),
  setCurrentUserIsAuthenticated: (isAuthenticated) =>
    set((state) => {
      state.currentUserIsAuthenticated = isAuthenticated;
      return state;
    }),
  logout: () =>
    set((state) => {
      state.currentUserEmail = null;
      state.currentUserIsAuthenticated = false;
      return state;
    }),
  setPasswordError: (passwordError) =>
    set((state) => {
      state.passwordError = passwordError;
      return state;
    }),
});
