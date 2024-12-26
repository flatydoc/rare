import { Fraction } from "../types";
import alliance from "../../assets/alliance_bg.webp";
import demons from "../../assets/demons_bg.webp";
import undead from "../../assets/undead_bg.webp";
import elves from "../../assets/elves_bg.webp";
import orcs from "../../assets/orcs_bg.webp";

const BG_BY_CARD_FRACTION: Record<Fraction, string> = {
  alliance,
  demons,
  undead,
  elves,
  orcs,
};

export const getBgByCardFraction = (fraction: Fraction): string => {
  const bg = BG_BY_CARD_FRACTION[fraction];
  if (!bg) {
    throw new Error(`Unknown card fraction: ${fraction}`);
  }
  return bg;
};
