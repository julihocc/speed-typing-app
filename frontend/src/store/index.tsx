import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createGameSlice } from "./gameSlice";
import { createTimerSlice } from "./timerSlice";
import { createStatsSlice } from "./statsSlice";

const useBoundStore = create<BoundStore>()(
  devtools(
    persist(
      immer((state, set, api) => ({
        ...createGameSlice(state, set, api), 
        ...createTimerSlice(state, set, api),
        ...createStatsSlice(state, set, api),
      })),
      {
        name: "game-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    { name: "game-devtools" }
  )
);

export default useBoundStore;
