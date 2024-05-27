import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "./userSlice";

const useIndexedStore = create<IndexedStore>()(
  devtools(
    persist(
      immer((state, set, api) => ({
        ...createUserSlice(state, set, api),
      })),
      {
        name: "user-storage",
      }
    ),
    { name: "user-devtools" }
  )
);
