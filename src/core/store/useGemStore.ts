import { create } from "zustand";
import { IGem } from "../types";

interface GemState {
  gems: IGem[];
  setGems: (gems: IGem[]) => void;
  getGemById: (gemId: number) => IGem | undefined;
  addGem: (gem: IGem) => void;
  insertGem: (gemId: number) => void;
  removeGem: (gemId: number) => void;
}

export const useGemStore = create<GemState>((set, get) => ({
  gems: [],

  setGems: (gems) => set({ gems }),

  getGemById: (gemId) => {
    const state = get();
    return state.gems.find((gem) => gem.id === gemId);
  },

  addGem: (gem) =>
    set((state) => ({
      gems: [...state.gems, gem],
    })),

  insertGem: (gemId: number) =>
    set((state) => ({
      gems: state.gems.map((gem) =>
        gem.id === gemId ? { ...gem, inserted: true } : gem
      ),
    })),

  removeGem: (gemId: number) =>
    set((state) => ({
      gems: state.gems.map((gem) =>
        gem.id === gemId ? { ...gem, inserted: false } : gem
      ),
    })),
}));
