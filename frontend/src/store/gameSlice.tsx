import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

type Color = "green" | "red" | undefined;
export interface GameSlice {
  captured: string[];
  nailed: (boolean | null)[];
  colors: Color[];
  initTime: number | null;
  endTime: number | null;
  setCaptured: (captured: string[]) => void;
  setNailed: (nailed: (boolean | null)[]) => void;
  setColors: (colors: Color[]) => void;
  setInitTime: (initTime: number | null) => void;
  setEndTime: (endTime: number | null) => void;
}

export const createGameSlice: StateCreator<
  GameSlice,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ]
> = (set) => ({
  captured: ["hello"],
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
});
