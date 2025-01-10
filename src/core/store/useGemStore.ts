import { create } from "zustand";
import { IGem } from "../types";
import { MAX_LEVELS } from "../constants";

interface GemState {
  gems: IGem[];
  setGems: (gems: IGem[]) => void;
  getGemById: (gemId: number) => IGem | undefined;
  addGem: (gem: IGem) => void;
  insertGem: (gemId: number) => void;
  removeGem: (gemId: number) => void;
  upgradeGemLevel: (gemId: number) => void;
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

  upgradeGemLevel: (gemId: number) =>
    set((state) => ({
      gems: state.gems.map((gem) => {
        if (gem.id === gemId) {
          const maxLevel = MAX_LEVELS[gem.rarity];
          if (gem.level >= maxLevel) {
            return gem;
          }
          return {
            ...gem,
            level: gem.level + 1,
            damageModifier:
              gem.damageModifier > 0
                ? +(gem.damageModifier * 1.1).toFixed(2)
                : gem.damageModifier,
            armorModifier:
              gem.armorModifier > 0
                ? +(gem.armorModifier * 1.1).toFixed(2)
                : gem.armorModifier,
            healthModifier:
              gem.healthModifier > 0
                ? +(gem.healthModifier * 1.1).toFixed(2)
                : gem.healthModifier,
          };
        }
        return gem;
      }),
    })),
}));
