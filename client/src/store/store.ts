import create from 'zustand';
import { IUser } from '../interfaces/user.interface';

export const useStore = create((set: Function) => ({
  user: null,
  setUser: async (user: IUser) => {
    set({ user });
  },
}));
