import { Fraction } from "../../../core/types";
import { Element } from "../../../core/types";

export const getElementalDamageReduction = (
  targetFraction: Fraction,
  attackElement: Element
): number => {
  const reductions: Record<Fraction, Record<Element, number>> = {
    alliance: {
      holy: 0.8, // 80% меньше урона
      frost: 0,
      flame: 0,
      shock: 0,
      earth: 0,
      darkness: 0,
      simple: 0,
      poison: 0,
    },
    undead: {
      darkness: 0.7, // 70% меньше урона
      frost: 0,
      flame: 0,
      shock: 0,
      earth: 0,
      holy: 0,
      simple: 0,
      poison: 0,
    },
    demons: {
      flame: 0,
      frost: 0,
      shock: 0,
      earth: 0,
      holy: 0,
      darkness: 0,
      simple: 0,
      poison: 0,
    },
    elves: {
      earth: 0.5, // 50% меньше урона
      frost: 0,
      flame: 0,
      shock: 0,
      holy: 0,
      darkness: 0,
      simple: 0,
      poison: 0,
    },
    orcs: {
      frost: 0,
      flame: 0,
      shock: 0,
      earth: 0,
      holy: 0,
      darkness: 0,
      simple: 0,
      poison: 0,
    },
  };

  return reductions[targetFraction][attackElement] || 0;
};
