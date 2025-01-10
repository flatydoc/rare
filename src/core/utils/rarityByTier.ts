import { Rarity, Tier } from "../types";

export const rarityByTier: Record<Tier, Rarity> = {
  D: "common",
  C: "uncommon",
  B: "rare",
  A: "mythical",
  "A+": "legendary",
  S: "epic",
  "S+": "immortal",
  SS: "ancient",
};
