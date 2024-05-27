import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { encryptPassword } from "../../utils/encrypt";

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
  currentUserEmail: "",
  currentUserPassword: "",
  setCurrentUserEmail: (email) =>
    set((state) => {
      state.currentUserEmail = email;
      return state;
    }),
  setCurrentUserPassword: (password) =>
    set((state) => {
      // const salt = bcrypt.genSaltSync(10);
      // const hashedPassword = bcrypt.hashSync(password, salt);
      const hashedPassword = encryptPassword(password);
      console.log("Password has been hashed", hashedPassword);
      state.currentUserPassword = hashedPassword;
      return state;
    }),
});
