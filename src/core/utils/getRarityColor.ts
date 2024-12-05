import { colors } from "../theme/colors";
import { Rarity } from "../types";

export const getRarityColor = (rarity: Rarity): string => {
  return colors[rarity];
};
