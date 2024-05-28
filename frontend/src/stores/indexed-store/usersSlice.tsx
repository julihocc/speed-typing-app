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
> = (set, get) => ({
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
  getUserByEmail: (email) => get().users.find((user) => user.email === email),
  pushMatchRecord: (email, matchRecord) =>
    set((state) => {
      const user = state.users.find((user) => user.email === email);
      if (!user) {
        console.error("User not found");
        return state;
      }
      user.matchRecords.push(matchRecord);
      return state;
    }),
  resetMatchRecords: (email) =>
    set((state) => {
      const user = state.users.find((user) => user.email === email);
      if (!user) {
        console.error("User not found");
        return state;
      }
      user.matchRecords = [];
      return state;
    }),
});
