import { create } from "zustand";
import { ICard, IGem } from "../types";
import { getNextRarity } from "../utils/getNextRarity";

interface CardState {
  cards: ICard[];
  setCards: (cards: ICard[]) => void;
  upgradeCardRarity: (cardId: number) => void;
  addGemToCard: (cardId: number, gem: IGem) => void;
  getCardById: (cardId: number) => ICard | undefined;
  getCardsByNumber: (number: number, id: number) => ICard[];
  mergeCards: (cardId: number, cardToMergeId: number) => void;
}

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],

  setCards: (cards) => set({ cards }),

  getCardById: (cardId) => {
    const state = get();
    return state.cards.find((card) => card.id === cardId);
  },

  getCardsByNumber: (number, id) => {
    const state = get();
    return state.cards.filter(
      (card) => card.number === number && card.id !== id
    );
  },

  mergeCards: (cardId: number, cardToMergeId: number) =>
    set((state) => {
      const updatedCards = state.cards
        .map((card) => {
          if (card.id === cardId) {
            return {
              ...card,
              stars: card.stars + 1,
              power: card.power * card.powerCoef,
              health: card.health * card.healthCoef,
              armor: card.armor * card.armorCoef,
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
            return {
              ...card,
              rarity: nextRarity,
              power: card.power * card.powerCoef,
              health: card.health * card.healthCoef,
              armor: card.armor * card.armorCoef,
              sockets: card.sockets + 1,
            };
          } else {
            return card;
          }
        }
        return card;
      });

      return { cards: updatedCards };
    }),

  addGemToCard: (cardId, gem) =>
    set((state) => {
      const updatedCards = state.cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            gemIds: [...card.gemIds, gem.id],
          };
        }
        return card;
      });

      return { cards: updatedCards };
    }),
}));
