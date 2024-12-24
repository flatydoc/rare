import { Rarity } from "../types";

export const getNextRarity = (currentRarity: Rarity): Rarity | null => {
  const rarities: Rarity[] = [
    "common",
    "uncommon",
    "rare",
    "mythical",
    "legendary",
    "epic",
    "immortal",
    "ancient",
  ];

  const currentIndex = rarities.indexOf(currentRarity);

  if (currentIndex === -1 || currentIndex === rarities.length - 1) {
    return null;
  }

  return rarities[currentIndex + 1];
};
