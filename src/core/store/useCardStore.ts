import { create } from "zustand";
import { ICard, ICardPrototype, IGem } from "../types";
import { getNextRarity } from "../utils/getNextRarity";
import { gemKits, MAX_CARD_LEVEL } from "../constants";

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
  generateNewCard: (prototype: ICardPrototype) => ICard;
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
    return state.cards.filter((card) => card.id !== id && card.stars === stars);
  },

  generateNewCard: (prototype) => {
    const state = get();
    const lastId =
      state.cards.length > 0
        ? Math.max(...state.cards.map((card) => card.id))
        : 0;
    const newId = lastId + 1;

    const newCard: ICard = {
      id: newId,
      number: prototype.id,
      rarity: prototype.rarity,
      tier: prototype.tier,
      price: prototype.price,
      power: prototype.power,
      bonusPower: 0,
      powerCoef: prototype.powerCoef,
      health: prototype.health,
      bonusHealth: 0,
      healthCoef: prototype.healthCoef,
      armor: prototype.armor,
      bonusArmor: 0,
      armorCoef: prototype.armorCoef,
      exp: 0,
      level: 1,
      stars: 0,
      fraction: prototype.fraction,
      priceCurrency: prototype.priceCurrency,
      name: prototype.name,
      description: prototype.description,
      img: prototype.img,
      gemIds: [],
      sockets: prototype.sockets,
      element: prototype.element,
      class: prototype.class,
    };

    set((state) => ({
      cards: [...state.cards, newCard],
    }));

    return newCard;
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
          if (card.level >= MAX_CARD_LEVEL) {
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

          const kit = gem.kitId
            ? gemKits.find((kit) => kit.id === gem.kitId)
            : null;

          let updatedCard = {
            ...card,
            gemIds: updatedGemIds,
            bonusPower: card.bonusPower + gem.powerModifier,
            bonusArmor: card.bonusArmor + gem.armorModifier,
            bonusHealth: card.bonusHealth + gem.healthModifier,
            element: gem.element || card.element,
          };

          if (kit) {
            const allGemsFromKit = kit.gemIds.every((kitGemId) =>
              updatedGemIds.includes(kitGemId)
            );

            if (allGemsFromKit) {
              updatedCard = {
                ...updatedCard,
                bonusPower: updatedCard.bonusPower + kit.powerModifier,
                bonusArmor: updatedCard.bonusArmor + kit.armorModifier,
                bonusHealth: updatedCard.bonusHealth + kit.healthModifier,
              };
            }
          }

          return updatedCard;
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
            const kit = gem.kitId
              ? gemKits.find((kit) => kit.id === gem.kitId)
              : null;

            let gemsFromKitInCard = 0;
            if (kit) {
              gemsFromKitInCard = updatedGemIds.filter(
                (id) => id !== null && kit.gemIds.includes(id as number)
              ).length;
            }

            updatedGemIds[slotIndex] = null;

            let updatedCard = {
              ...card,
              gemIds: updatedGemIds,
              bonusPower: card.bonusPower - gem.powerModifier,
              bonusArmor: card.bonusArmor - gem.armorModifier,
              bonusHealth: card.bonusHealth - gem.healthModifier,
            };

            if (kit) {
              if (gemsFromKitInCard === 3) {
                updatedCard = {
                  ...updatedCard,
                  bonusPower: updatedCard.bonusPower - kit.powerModifier,
                  bonusArmor: updatedCard.bonusArmor - kit.armorModifier,
                  bonusHealth: updatedCard.bonusHealth - kit.healthModifier,
                };
              }
            }

            return updatedCard;
          }
        }
        return card;
      });

      return { cards: updatedCards };
    }),
}));
