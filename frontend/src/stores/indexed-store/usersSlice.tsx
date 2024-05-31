import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { encrypt } from "../../utils/encrypt";

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
  getUserByEmail: (email) => {
    if (!email) return undefined;
    return get().users.find((user) => user.email === email);
  },
  pushMatchRecord: (email, matchRecord) =>
    set((state) => {
      const user = state.users.find((user) => user.email === email);
      if (!user) {
        console.error("User not found");
        return state;
      }

      const thereAreNulls = Object.values(matchRecord).some(
        (value) => value === null
      );

      if (thereAreNulls) {
        console.error("Match record has null values");
        return state;
      }

      user.matchRecords.push(matchRecord);
      return state;
    }),
  resetMatchRecords: (email) =>
    set((state) => {
      if (!email) {
        return state;
      }
      const user = state.users.find((user) => user.email === email);
      if (!user) {
        console.error("User not found");
        return state;
      }
      user.matchRecords = [];
      return state;
    }),
  checkPassword: (email, password) => {
    const user = get().users.find((user) => user.email === email);
    if (!user) {
      console.error("User not found");
      return false;
    }
    return user.password === encrypt(password);
  },
});
