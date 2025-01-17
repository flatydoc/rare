import { StatusEffectId } from "../../../core/enums/statusEffects";
import { IFightCard, IStatusEffect } from "../../../core/types";
import { createStatusEffect } from "../../../core/utils/createStatusEffects";
import { canApplyStatusEffect } from "./canApplyStatusEffect";

export const applyStatusEffects = (
  target: IFightCard,
  attacker: IFightCard
): IStatusEffect[] => {
  if (!attacker.element || attacker.element === "simple")
    return target.statusEffects;

  const effectKey =
    attacker.element.charAt(0).toUpperCase() +
    attacker.element.slice(1).toLowerCase();
  const effectId = StatusEffectId[effectKey as keyof typeof StatusEffectId];

  if (!canApplyStatusEffect(target.fraction, effectId))
    return target.statusEffects;

  const existingEffectIndex = target.statusEffects.findIndex(
    (effect) => effect.id === effectId
  );

  if (existingEffectIndex !== -1) {
    return target.statusEffects.map((effect, index) =>
      index === existingEffectIndex
        ? { ...effect, duration: effect.duration + 1 }
        : effect
    );
  } else {
    return [...target.statusEffects, createStatusEffect(effectId, 2)];
  }
};
