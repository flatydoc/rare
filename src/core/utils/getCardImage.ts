import { Rarity } from "../types";
import demon from "../../assets/demon.png";
import baba from "../../assets/baba.png";
import ded from "../../assets/ded.png";
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
  2: {
    common: demon,
    uncommon: demon,
    rare: demon,
    mythical: demon,
    legendary: demon,
    epic: demon,
    immortal: demon,
    ancient: demon,
  },
  3: {
    common: baba,
    uncommon: baba,
    rare: baba,
    mythical: baba,
    legendary: baba,
    epic: baba,
    immortal: baba,
    ancient: baba,
  },
  4: {
    common: ded,
    uncommon: ded,
    rare: ded,
    mythical: ded,
    legendary: ded,
    epic: ded,
    immortal: ded,
    ancient: ded,
  },
};

export const getCardImage = (cardId: number, rarity: Rarity): string => {
  const cardRarities = cardImageMap[cardId];
  return (cardRarities && cardRarities[rarity]) || zombieLevel1;
};
