import create from 'zustand';

export const useStore = create((set: Function) => ({
  num: 0,
  increaseNum: () => set((state: { num: number }) => ({ num: state.num + 1 })),
  resetNum: () => set({ num: 0 }),
}));
