import { create } from "zustand";
import { ICardPrototype } from "../types";

interface CardState {
  cards: ICardPrototype[];
  setCards: (cards: ICardPrototype[]) => void;
  getCardById: (cardId: number) => ICardPrototype | undefined;
}

export const useAllCardsStore = create<CardState>((set, get) => ({
  cards: [],

  setCards: (cards) => set({ cards }),

  getCardById: (cardId) => {
    const state = get();
    return state.cards.find((card) => card.id === cardId);
  },
}));
