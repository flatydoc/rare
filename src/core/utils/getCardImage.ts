import { Rarity } from "../types";

import zombieLevel1 from "../../assets/zombie_level_1.png";
import zombieLevel2 from "../../assets/zombie_level_2.png";
import zombieLevel3 from "../../assets/zombie_level_3.png";
import zombieLevel4 from "../../assets/zombie_level_4.png";
import zombieLevel5 from "../../assets/zombie_level_5.png";

const cardImageMap: { [key: number]: { [key in Rarity]?: string } } = {
  1: {
    common: zombieLevel1,
    uncommon: zombieLevel2,
    rare: zombieLevel3,
    mythical: zombieLevel3,
    legendary: zombieLevel4,
    epic: zombieLevel4,
    immortal: zombieLevel5,
    ancient: zombieLevel5,
  },
};

export const getCardImage = (cardId: number, rarity: Rarity): string => {
  const cardRarities = cardImageMap[cardId];
  return (cardRarities && cardRarities[rarity]) || zombieLevel1;
};
