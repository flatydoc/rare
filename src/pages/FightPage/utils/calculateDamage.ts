import { IFightCard } from "../../../core/types";
import { getRandomDamage } from "../../../core/utils/getRandomDamage";
import { getElementalDamageReduction } from "./getElementalDamageReduction";
import { getFractionMultiplier } from "./getFractionMultiplier";

export const calculateDamage = (
  attacker: IFightCard,
  target: IFightCard
): { damage: number; isCrit: boolean } => {
  let rawDamage = getRandomDamage(attacker.damage);
  let isCrit = false;

  // Учет критического урона для "орков"
  if (attacker.fraction === "orcs" && Math.random() <= 0.3) {
    rawDamage *= 1.5;
    isCrit = true;
  }

  const fractionModifier = getFractionMultiplier(
    attacker.fraction,
    target.fraction
  );
  const elementalReduction = getElementalDamageReduction(
    target.fraction,
    attacker.element || "simple"
  );

  const modifiedDamage =
    rawDamage * fractionModifier * (1 - elementalReduction);
  const damageAfterArmor = Math.max(0, modifiedDamage - target.armor);

  return { damage: damageAfterArmor, isCrit };
};
