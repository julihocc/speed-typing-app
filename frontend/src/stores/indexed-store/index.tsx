import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createUsersSlice } from "./usersSlice";

// import storage from "./storage";

const useIndexedStore = create<IIndexedStore>()(
  devtools(
    persist(
      immer((state, set, api) => ({
        ...createUsersSlice(state, set, api),
      })),
      {
        name: "indexed-storage",
        // storage: createJSONStorage(() => storage),
        // storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: "indexed-devtools" }
  )
);

export default useIndexedStore;
