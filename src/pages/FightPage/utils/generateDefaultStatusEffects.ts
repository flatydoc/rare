import { Element, Fraction, IStatusEffect } from "../../../core/types";
import { elementEmojis, fractionEmojis } from "../../SingleCardPage/constants";

export const generateDefaultStatusEffects = (
  fraction: Fraction,
  element: Element
): IStatusEffect[] => {
  const effects: IStatusEffect[] = [
    {
      id: 1,
      title: `Effect of ${fraction}`,
      duration: null,
      icon: fractionEmojis[fraction],
    },
  ];

  if (element !== "simple") {
    effects.push({
      id: 2,
      title: `Effect of ${element}`,
      duration: null,
      icon: elementEmojis[element],
    });
  }

  return effects;
};
