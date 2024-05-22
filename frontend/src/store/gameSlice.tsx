import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createGameSlice: StateCreator<
  GameSlice & TimerSlice,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ], 
  [],
  GameSlice
> = (set) => ({
  captured: [],
  nailed: [],
  colors: [],
  initTime: null,
  endTime: null,
  setCaptured: (captured) =>
    set((state) => {
      state.captured = captured;
      return state;
    }),
  setNailed: (nailed) =>
    set((state) => {
      state.nailed = nailed;
      return state;
    }),
  setColors: (colors) =>
    set((state) => {
      state.colors = colors;
      return state;
    }),
  setInitTime: (initTime) =>
    set((state) => {
      state.initTime = initTime;
      return state;
    }),
  setEndTime: (endTime) =>
    set((state) => {
      state.endTime = endTime;
      return state;
    }),
  resetGame: () =>
    set((state) => {
      state.captured = [];
      state.nailed = [];
      state.colors = [];
      state.initTime = null;
      state.endTime = null;
      return state;
    }),
});
