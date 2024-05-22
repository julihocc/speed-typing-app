import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export interface TimeSlice {
  remainingTime: number;
  setRemainingTime: (remainingTime: number) => void;
}

export const createTimeSlice: StateCreator<
  TimeSlice,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ]
> = (set) => ({
  remainingTime: 60,
  setRemainingTime: (remainingTime) =>
    set((state) => {
      state.remainingTime = remainingTime;
      return state;
    }),
});
