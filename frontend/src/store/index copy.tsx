import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { GameSlice, createGameSlice } from "./gameSlice";
import { TimerSlice, createTimerSlice } from "./timerSlice";

type BoundStore = GameSlice & TimerSlice;

const useBoundStore = create<BoundStore>()(
  devtools(
    persist(
      immer((state, set, api) => ({
        ...createGameSlice(state, set, api), // Access game state explicitly
        ...createTimerSlice(state, set, api), // Access timer state explicitly
      })),
      { name: "game-storage" }
    ),
    { name: "game-devtools" }
  )
);

export default useBoundStore;
