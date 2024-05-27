import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createUsersSlice: StateCreator<
  IIndexedStore,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  IUsers
> = (set) => ({
  users: [],
  addUser: (user) =>
    set((state) => {
      state.users.push(user);
      return state;
    }),
  removeUser: (email) =>
    set((state) => {
      state.users = state.users.filter((user) => user.email !== email);
      return state;
    }),
});
