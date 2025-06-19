import { create } from 'zustand';

export const useStatsStore = create((set) => ({
  statsList: [],

  // Thêm một bộ stats mới
  addStats: (algorithmName, stats) =>
    set((state) => ({
      statsList: [
        ...state.statsList.filter(item => item.algorithm !== algorithmName), // tránh trùng
        { algorithm: algorithmName, ...stats }
      ]
    })),

  // Xóa tất cả stats
  clearStats: () => set({ statsList: [] }),
}));
