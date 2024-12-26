import { create } from "zustand";
import { ICard, IGem } from "../types";
import { getNextRarity } from "../utils/getNextRarity";

interface CardState {
  cards: ICard[];
  setCards: (cards: ICard[]) => void;
  upgradeCardRarity: (cardId: number) => void;
  upgradeCardLevel: (cardId: number) => void;
  addGemToCard: (cardId: number, gem: IGem, slotIndex: number) => void;
  removeGemFromCard: (cardId: number, gem: IGem, slotIndex: number) => void;
  getCardById: (cardId: number) => ICard | undefined;
  getCardsByStars: (id: number, stars: number) => ICard[];
  mergeCards: (cardId: number, cardToMergeId: number) => void;
}

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],

  setCards: (cards) => set({ cards }),

  getCardById: (cardId) => {
    const state = get();
    return state.cards.find((card) => card.id === cardId);
  },

  getCardsByStars: (id, stars) => {
    const state = get();
    return state.cards.filter((card) => card.id !== id && card.stars >= stars);
  },

  mergeCards: (cardId: number, cardToMergeId: number) =>
    set((state) => {
      const updatedCards = state.cards
        .map((card) => {
          if (card.id === cardId) {
            const newPower = card.power + (card.power * card.powerCoef) / 15;
            const newHealth =
              card.health + (card.health * card.healthCoef) / 15;
            const newArmor = card.armor + (card.armor * card.armorCoef) / 15;

            return {
              ...card,
              stars: card.stars + 1,
              power: newPower,
              health: newHealth,
              armor: newArmor,
            };
          }
          return card;
        })
        .filter((card) => card.id !== cardToMergeId);

      return { cards: updatedCards };
    }),

  upgradeCardRarity: (cardId) =>
    set((state) => {
      const updatedCards = state.cards.map((card) => {
        if (card.id === cardId) {
          const nextRarity = getNextRarity(card.rarity);

          if (nextRarity) {
            const newPower = card.power + (card.power * card.powerCoef) / 10;
            const newHealth =
              card.health + (card.health * card.healthCoef) / 10;
            const newArmor = card.armor + (card.armor * card.armorCoef) / 10;

            return {
              ...card,
              rarity: nextRarity,
              power: newPower,
              health: newHealth,
              armor: newArmor,
              sockets: nextRarity === "immortal" ? 6 : card.sockets + 1,
            };
          } else {
            return card;
          }
        }
        return card;
      });

      return { cards: updatedCards };
    }),

  upgradeCardLevel: (cardId) =>
    set((state) => {
      const updatedCards = state.cards.map((card) => {
        if (card.id === cardId) {
          if (card.level >= 25) {
            return card;
          }

          const nextLevel = card.level + 1;

          const newPower = card.power + (card.power * card.powerCoef) / 20;
          const newHealth = card.health + (card.health * card.healthCoef) / 20;
          const newArmor = card.armor + (card.armor * card.armorCoef) / 20;

          return {
            ...card,
            level: nextLevel,
            exp: 0,
            power: newPower,
            health: newHealth,
            armor: newArmor,
          };
        }
        return card;
      });

      return { cards: updatedCards };
    }),

  addGemToCard: (cardId, gem, slotIndex) =>
    set((state) => {
      const updatedCards = state.cards.map((card) => {
        if (card.id === cardId) {
          const updatedGemIds = [...card.gemIds];
          updatedGemIds[slotIndex] = gem.id;

          return {
            ...card,
            gemIds: updatedGemIds,
            bonusPower: card.bonusPower + gem.powerModifier,
            bonusArmor: card.bonusArmor + gem.armorModifier,
            bonusHealth: card.bonusHealth + gem.healthModifier,
            element: gem.element ? gem.element : card.element,
          };
        }
        return card;
      });

      return { cards: updatedCards };
    }),

  removeGemFromCard: (cardId: number, gem: IGem, slotIndex: number) =>
    set((state) => {
      const updatedCards = state.cards.map((card) => {
        if (card.id === cardId) {
          const updatedGemIds = [...card.gemIds];

          const gemId = updatedGemIds[slotIndex];

          if (gemId === gem.id) {
            updatedGemIds[slotIndex] = null;

            return {
              ...card,
              gemIds: updatedGemIds,
              bonusPower: card.bonusPower - gem.powerModifier,
              bonusArmor: card.bonusArmor - gem.armorModifier,
              bonusHealth: card.bonusHealth - gem.healthModifier,
            };
          }
        }
        return card;
      });

      return { cards: updatedCards };
    }),
}));
