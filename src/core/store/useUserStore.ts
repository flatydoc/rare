import { create } from "zustand";
import { IUser } from "../types";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  updateBalance: (newBalance: number) => void;
  updateEnergy: (newEnergy: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateBalance: (newBalance) =>
    set((state) => ({
      user: state.user ? { ...state.user, balance: newBalance } : null,
    })),
  updateEnergy: (decreaseAmount) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            energy: Math.max(0, state.user.energy - decreaseAmount),
          }
        : null,
    })),
}));
