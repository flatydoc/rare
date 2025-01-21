import { StatusEffectId } from "../../../core/enums/statusEffects";
import { IFightCard } from "../../../core/types";
import { createStatusEffect } from "../../../core/utils/createStatusEffects";
import { canApplyStatusEffect } from "./canApplyStatusEffect";

export const applyStatusEffects = (
  target: IFightCard,
  attacker: IFightCard
): IFightCard => {
  if (
    !attacker.element ||
    attacker.element === "simple" ||
    attacker.element === "holy" ||
    attacker.element === "shock"
  ) {
    return target;
  }

  const effectKey =
    attacker.element.charAt(0).toUpperCase() +
    attacker.element.slice(1).toLowerCase();
  const effectId = StatusEffectId[effectKey as keyof typeof StatusEffectId];

  if (!canApplyStatusEffect(target.fraction, effectId)) {
    return target;
  }

  const updatedStatusEffects = [...target.statusEffects];
  const existingEffectIndex = updatedStatusEffects.findIndex(
    (effect) => effect.id === effectId
  );

  // Если эффект уже существует, продлеваем его
  if (existingEffectIndex !== -1) {
    updatedStatusEffects[existingEffectIndex] = {
      ...updatedStatusEffects[existingEffectIndex],
      duration: updatedStatusEffects[existingEffectIndex].duration + 1,
    };

    // Возвращаем цель без изменения характеристик
    return {
      ...target,
      statusEffects: updatedStatusEffects,
    };
  }

  // Если эффекта нет, создаём новый
  updatedStatusEffects.push(createStatusEffect(effectId));

  // Если элемент — "flame", уменьшаем броню цели на 30%
  const updatedFightArmor =
    attacker.element === "flame"
      ? Math.floor(target.fightArmor * 0.7)
      : target.fightArmor;

  // Если элемент — "frost", уменьшаем урон цели на 30%
  const updatedFightDamage =
    attacker.element === "frost"
      ? Math.floor(target.fightDamage * 0.7)
      : target.fightDamage;

  return {
    ...target,
    fightArmor: updatedFightArmor,
    fightDamage: updatedFightDamage,
    statusEffects: updatedStatusEffects,
  };
};
