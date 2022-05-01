import create from 'zustand';
import { IUser } from '../interfaces/user.interface';

interface CoreState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}
export const useStore = create<CoreState>((set: Function) => ({
  user: null,
  setUser: async (user: IUser) => {
    set({ user });
  },
}));
