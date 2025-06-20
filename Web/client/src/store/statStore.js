import { create } from "zustand";

export const useStatsStore = create((set) => ({
  stats: [],
  addStats: (alg, stats) =>
    set((state) => ({
      stats: [...state.stats, { alg, ...stats }]
    })),
  clearStats: () => set({ stats: [] }),
}));