import create from 'zustand';
import { IUser } from '../interfaces/user.interface';

interface CoreState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;

  authModal: {
    visible: boolean;
  };
  openAuthModal: () => void;
  closeAuthModal: () => void;

  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export const useStore = create<CoreState>(set => ({
  user: null,
  authModal: {
    visible: false,
  },
  isDark: false,
  setUser: user => {
    set({ user });
  },
  openAuthModal: () => {},
  closeAuthModal: () => {},
  setIsDark: () => set(state => ({ isDark: !state.isDark })),
}));
