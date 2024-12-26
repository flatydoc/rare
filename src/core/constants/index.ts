import { GemKit } from "../types";

export const MAX_ENERGY = 100;
export const INSERT_GEM_PRICE = 1000;

export const gemKits: GemKit[] = [
  {
    id: 1,
    name: "Flameheart Kit",
    description:
      "Набор, усиливающий огненные способности и увеличивающий урон. Подходит для агрессивного стиля игры.",
    gemIds: [122, 120],
    powerModifier: 50,
    armorModifier: 0,
    healthModifier: 0,
  },
  {
    id: 2,
    name: "Stoneguard Kit",
    description:
      "Набор, укрепляющий защиту и увеличивающий здоровье. Отличный выбор для защитного стиля игры.",
    gemIds: [121, 123],
    powerModifier: 0,
    armorModifier: 20,
    healthModifier: 10,
  },
];
