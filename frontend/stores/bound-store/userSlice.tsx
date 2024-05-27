import { StateCreator } from "zustand";
import { persist, devtools,  } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { encryptPassword } from "../utils/encrypt";

persist;
immer;
devtools;

export const createUserSlice: StateCreator<
  BoundStore,
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
      // const salt = bcrypt.genSaltSync(10);
      // const hashedPassword = bcrypt.hashSync(password, salt);
      const hashedPassword = encryptPassword(password);
      console.log("Password has been hashed", hashedPassword);
      state.password = hashedPassword;
      return state;
    }),
});
