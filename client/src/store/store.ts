import create from 'zustand';
import { IUser } from '../interfaces/user.interface';
import produce from 'immer';
interface CoreState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  authModal: {
    visible: boolean;
  };
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useStore = create<CoreState>(set => ({
  user: null,
  authModal: {
    visible: false,
  },
  setUser: user =>
    set(
      produce(draft => {
        draft.user = user;
      }),
    ),
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
}));
