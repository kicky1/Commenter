import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type UserMenuStore = {
  pokedUser: string | null;
  setPokedUser: (pokedUser: string | null) => void;
};

export const useUserMenuStore = create<UserMenuStore>()(immer((set) => ({
    pokedUser: '',
    setPokedUser: (name) => {
        set((state) => {
          state.pokedUser = name;
        });
      },
})))

export const {setPokedUser} = useUserMenuStore.getState();