import { create } from "zustand";
import { IUser } from "../types";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  updateBalance: (newBalance: number) => void;
  updateEnergy: (newEnergy: number) => void;
  getCaseCountById: (caseId: number) => number;
  addCard: (cardId: number) => void;
  removeCard: (cardId: number) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
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

  getCaseCountById: (caseId) => {
    const state = get();
    if (state.user) {
      return state.user.cases.filter((id) => id === caseId).length;
    }
    return 0;
  },

  addCard: (cardId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            cards: [...state.user.cards, cardId],
          }
        : null,
    })),

  removeCard: (cardId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            cards: state.user.cards.filter((id) => id !== cardId),
          }
        : null,
    })),
}));
