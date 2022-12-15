import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type AuthorizationFormStore = {
  isVisible: boolean;
  setVisible: (flag: boolean) => void;
};

export const useAuthorizationFormStore = create<AuthorizationFormStore>()(immer((set) => ({
  isVisible: false,
  setVisible: (flag) => {
    set((state) => {
      state.isVisible = flag;
    });
  },
})))

export const {setVisible} = useAuthorizationFormStore.getState();