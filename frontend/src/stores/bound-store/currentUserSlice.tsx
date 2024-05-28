import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createCurrentUserSlice: StateCreator<
  BoundStore,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  CurrentUserSlice
> = (set) => ({
  currentUser: null,
  currentUserEmail: null,
  currentUserIsAuthenticated: false,
  setCurrentUser: (user) =>
    set((state) => {
      state.currentUser = user;
      return state;
    }),
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


});
