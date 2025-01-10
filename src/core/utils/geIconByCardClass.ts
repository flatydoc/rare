import defender from "../../assets/defender.png";
import fighter from "../../assets/dd.png";
import support from "../../assets/support.png";
import { CardClass } from "../types";

export const ICONS_BY_CARD_CLASS: Record<CardClass, string> = {
  defender,
  fighter,
  support,
};

export const getIconByCardClass = (cardClass: CardClass): string => {
  const icon = ICONS_BY_CARD_CLASS[cardClass];
  if (!icon) {
    throw new Error(`Unknown card class: ${cardClass}`);
  }
  return icon;
};
