import { IFightCard } from "../../../core/types";
import { getRandomDamage } from "../../../core/utils/getRandomDamage";
import { getElementalDamageReduction } from "./getElementalDamageReduction";
import { getFractionMultiplier } from "./getFractionMultiplier";

export const calculateDamage = (
  attacker: IFightCard,
  target: IFightCard
): { damage: number; isCrit: boolean; isMiss: boolean } => {
  const isMiss = target.fraction === "elves" && Math.random() <= 0.2;

  if (isMiss) {
    return { damage: 0, isCrit: false, isMiss: true };
  }

  let rawDamage = getRandomDamage(attacker.fightDamage);
  let isCrit = false;

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

  const healthThresholdBonus =
    attacker.fraction === "orcs" &&
    attacker.fightHealth <= attacker.health * 0.5
      ? 1.3
      : 1;

  const modifiedDamage =
    rawDamage *
    fractionModifier *
    (1 - elementalReduction) *
    healthThresholdBonus;

  const ignoreArmor = attacker.fraction === "elves" && Math.random() <= 0.25;

  const effectiveArmor = ignoreArmor ? 0 : target.fightArmor;

  const damageAfterArmor = Math.max(0, modifiedDamage - effectiveArmor);

  return { damage: damageAfterArmor, isCrit, isMiss: false };
};
