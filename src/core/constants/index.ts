import { GemKit, Rarity } from "../types";

export const MAX_ENERGY = 100;
export const ENERGY_FOR_PVE = 10;
export const INSERT_GEM_PRICE = 1000;
export const UPDATE_GEM_PRICE = 1000;
export const MAX_CARD_LEVEL = 30;

export const gemKits: GemKit[] = [
  {
    id: 1,
    name: "Flameheart Kit",
    description:
      "Набор, усиливающий огненные способности и увеличивающий урон. Подходит для агрессивного стиля игры.",
    gemIds: [121, 122, 123],
    damageModifier: 50,
    armorModifier: 0,
    healthModifier: 0,
  },
];

export const MAX_LEVELS: Record<Rarity, number> = {
  common: 1,
  uncommon: 5,
  rare: 10,
  mythical: 15,
  legendary: 20,
  epic: 25,
  immortal: 30,
  ancient: 30,
};
