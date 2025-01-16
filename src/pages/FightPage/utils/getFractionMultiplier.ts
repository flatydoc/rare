import { Fraction } from "../../../core/types";

export const getFractionMultiplier = (
  attackerFraction: Fraction,
  targetFraction: Fraction
): number => {
  const multipliers: Record<Fraction, Record<Fraction, number>> = {
    alliance: {
      undead: 1.2,
      demons: 1.0,
      alliance: 1.0,
      elves: 1.0,
      orcs: 1.0,
    },
    undead: {
      alliance: 1.0,
      demons: 1.0,
      undead: 1.0,
      elves: 1.0,
      orcs: 1.0,
    },
    demons: {
      alliance: 1.2,
      undead: 1.0,
      demons: 1.0,
      elves: 1.0,
      orcs: 1.0,
    },
    elves: {
      undead: 1.0,
      demons: 1.0,
      alliance: 1.0,
      elves: 1.0,
      orcs: 1.0,
    },
    orcs: {
      alliance: 1.0,
      undead: 1.0,
      demons: 1.0,
      elves: 1.0,
      orcs: 1.0,
    },
  };

  return multipliers[attackerFraction][targetFraction] || 1.0;
};
