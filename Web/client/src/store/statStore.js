import { create } from "zustand";

export const useStatsStore = create((set) => ({
  stats: [],
  matrix: Array.from({ length: 25 }, () => Array(25).fill(0)),
  start: null,
  goal: null,
  setMatrix: (matrix) => set({ matrix }),
  setStart: (start) => set({ start }),
  setGoal: (goal) => set({ goal }),
  addStats: (alg, stats) =>
    set((state) => ({
      stats: [...state.stats, { alg, ...stats }]
    })),
  clearStats: () => set({ stats: [] }),
}));