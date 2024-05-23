import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createGameSlice: StateCreator<
  BoundStore,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  GameSlice
> = (set) => ({
  words: [],
  captured: [],
  nailed: [],
  colors: [],
  gameStartTime: null,
  gameEndTime: null,
  textFieldValue: undefined,
  setTextFieldValue: (text) =>
    set((state) => {
      state.textFieldValue = text;
      return state;
    }),
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
  setGameStartTime: (initTime) =>
    set((state) => {
      state.gameStartTime = initTime;
      return state;
    }),
  setGameEndTime: (endTime) =>
    set((state) => {
      state.gameEndTime = endTime;
      return state;
    }),
  resetGame: () =>
    set((state) => {
      // state.words = [];
      state.captured = [];
      state.nailed = [];
      state.colors = [];
      state.gameStartTime = null;
      state.gameEndTime = null;
      state.textFieldValue = undefined;
      return state;
    }),
  setWords: (text) =>
    set((state) => {
      state.words = text;
      return state;
    }),
});
