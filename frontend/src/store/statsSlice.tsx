import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createStatsSlice: StateCreator<
  BoundStore,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  StatsSlice
> = (set) => ({
  matchRecords: [],
  addMatchRecord: (matchRecord) =>
    set((state) => {
      state.matchRecords.push(matchRecord);
      return state;
    }),
  resetStats: () =>
    set((state) => {
      state.matchRecords = [];
      return state;
    }),
});
