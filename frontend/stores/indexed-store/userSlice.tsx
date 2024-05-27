import { StateCreator } from "zustand";
import { persist, devtools, StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import { immer } from "zustand/middleware/immer";
import bcrypt from "bcryptjs";

persist;
immer;
devtools;

export const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await del(name);
  },
};

export const createUserSlice: StateCreator<
  IndexedStore,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  UserSlice
> = (set) => ({
  username: "",
  email: "",
  password: "",
  setUsername: (username) =>
    set((state) => {
      state.username = username;
      return state;
    }),
  setEmail: (email) =>
    set((state) => {
      state.email = email;
      return state;
    }),
  setPassword: (password) =>
    set((state) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      console.log("Password has been hashed", hashedPassword);
      state.password = hashedPassword;
      return state;
    }),
});
