import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import storage from "./storage";
import { createUsersSlice } from "./usersSlice";

const useIndexedStore = create<IIndexedStore>()(
  devtools(
    persist(
      immer((state, set, api) => ({
        ...createUsersSlice(state, set, api),
      })),
      {
        name: "user-storage",
        storage: createJSONStorage(() => storage),
      }
    ),
    { name: "user-devtools" }
  )
);

export default useIndexedStore;
