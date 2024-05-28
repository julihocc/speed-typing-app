import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createGameSlice } from "./gameSlice";
import { createTimerSlice } from "./timerSlice";
import { createCurrentUserSlice } from "./currentUserSlice";

const useSessionStore = create<SessionStore>()(
  devtools(
    persist(
      immer((state, set, api) => ({
        ...createGameSlice(state, set, api),
        ...createTimerSlice(state, set, api),
        ...createCurrentUserSlice(state, set, api),
      })),
      {
        name: "session-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: "session-devtools" }
  )
);

export default useSessionStore;
