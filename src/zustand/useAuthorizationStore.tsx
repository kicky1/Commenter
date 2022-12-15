
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type AuthorizationStoreState = {
  authorized: boolean;
  username: string | null;
  userimage: string | null,
  logoutUser: () => void;
  setUsername: (name: string | null) => void;
  setAuthorized: (flag: boolean) => void;
  setUserImage : (image: string | null) => void;
};

export const useAuthorizationStore = create<AuthorizationStoreState>()(immer((set) => ({
  username: '',
  authorized: false,
  userimage: '',
  logoutUser: () => {
    set((state) => {
      state.authorized = false;
    });
  },
  setUsername: (name) => {
    set((state) => {
      state.username = name;
    });
  },
  setAuthorized: (flag) => {
    set((state) => {
      state.authorized = flag;
    });
  },
  setUserImage: (image) => {
    set((state) => {
      state.userimage = image;
    });
  },
})))

export const { logoutUser, setUsername, setAuthorized, setUserImage} = useAuthorizationStore.getState();