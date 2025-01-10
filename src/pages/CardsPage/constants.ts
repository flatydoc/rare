import { CardClass, Element, Fraction, ICard, Tier } from "../../core/types";

const rarityOrder = [
  "ancient",
  "immortal",
  "epic",
  "legendary",
  "mythical",
  "rare",
  "uncommon",
  "common",
];

const elementOrder: Element[] = [
  "simple",
  "flame",
  "frost",
  "shock",
  "earth",
  "holy",
  "darkness",
  "poison",
];

const classOrder: CardClass[] = ["fighter", "defender", "support"];

const fractionOrder: Fraction[] = [
  "alliance",
  "elves",
  "orcs",
  "demons",
  "undead",
];

const tierOrder: Tier[] = ["SS", "S+", "S", "A+", "A", "B", "C", "D"];

export const sortOrders: { [key in keyof ICard]?: string[] } = {
  rarity: rarityOrder,
  element: elementOrder,
  class: classOrder,
  fraction: fractionOrder,
  tier: tierOrder,
};
