import create from 'zustand';
import { IUser } from '../interfaces/user.interface';

//TODO: 폴더 이름 바꾸고 분리할까 고민 중
interface CoreState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}
export const useStore = create<CoreState>((set: Function) => ({
  user: null,
  setUser: async user => {
    set({ user });
  },
}));
