import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createTimerSlice: StateCreator<
  GameSlice & TimerSlice,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  TimerSlice
> = (set) => ({
  initialTimerValue: 60,
  remainingTime: null,
  setRemainingTime: (remainingTime) =>
    set((state) => {
      state.remainingTime = remainingTime;
      return state;
    }),
  resetTimer: () =>
    set((state) => {
      state.initialTimerValue = 60;
      state.remainingTime = null;
      return state;
    }),
});
