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
  pickedAvatar: null,
  setCurrentUserEmail: (email) =>
    set(
      (state) => {
        state.currentUserEmail = email;
        return state;
      },
      false,
      "setCurrentUserEmail"
    ),
  setCurrentUserIsAuthenticated: (isAuthenticated) =>
    set(
      (state) => {
        state.currentUserIsAuthenticated = isAuthenticated;
        return state;
      },
      false,
      "setCurrentUserIsAuthenticated"
    ),
  logout: () =>
    set(
      (state) => {
        state.currentUserEmail = null;
        state.currentUserIsAuthenticated = false;
        return state;
      },
      false,
      "logout"
    ),
  setPasswordError: (passwordError) =>
    set(
      (state) => {
        state.passwordError = passwordError;
        return state;
      },
      false,
      "setPasswordError"
    ),
  setPickedAvatar: (avatar) =>
    set(
      (state) => {
        state.pickedAvatar = avatar;
        return state;
      },
      false,
      "setPickedAvatar"
    ),
});
