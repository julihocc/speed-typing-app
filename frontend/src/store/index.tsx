import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { GameSlice, createGameSlice } from "./gameSlice";
import { TimerSlice, createTimerSlice } from "./timerSlice";

type BoundedStore = GameSlice;

// const useBoundStore = create<BoundedStore>()(
//   devtools(persist(immer(createGameSlice), { name: "game" }))
// );

const useBoundStore = create<BoundedStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createGameSlice(...a),
      })),
      { name: "game" }
    )
  )
);

export default useBoundStore;
