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
}

export const useStore = create<CoreState>((set: Function) => ({
  user: null,
  authModal: {
    visible: false,
  },
  setUser: user => {
    set({ user });
  },
  openAuthModal: () => {},
  closeAuthModal: () => {},
}));
