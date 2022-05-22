import create from 'zustand';
import { IUser } from '../interfaces/user.interface';
import produce from 'immer';
import { getLocalStorage } from '../utils/getLocalStorage';
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
  setUser: user =>
    set(
      produce(draft => {
        draft.user = user;
      }),
    ),

  authModal: {
    visible: false,
  },
  openAuthModal: () =>
    set(
      produce(draft => {
        draft.authModal.visible = true;
      }),
    ),
  closeAuthModal: () =>
    set(
      produce(draft => {
        draft.authModal.visible = false;
      }),
    ),

  isDark: getLocalStorage('isDark'),
  setIsDark: () => set(state => ({ isDark: !state.isDark })),
}));
