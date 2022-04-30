import create from 'zustand';
import UserAPI from '../api/user';

export const useStore = create((set: Function) => ({
  user: null,
  setUser: async () => {
    const user = await UserAPI.getCurrentUser();
    set({ user: user });
  },
}));
