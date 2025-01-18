import { StatusEffectId } from "../../../core/enums/statusEffects";
import { Fraction } from "../../../core/types";

export const immunityByFraction: Record<Fraction, StatusEffectId[]> = {
  alliance: [],
  undead: [StatusEffectId.Poison],
  demons: [StatusEffectId.Flame],
  elves: [],
  orcs: [],
};

export const canApplyStatusEffect = (
  fraction: Fraction,
  effectId: StatusEffectId
): boolean => {
  return !(immunityByFraction[fraction] || []).includes(effectId);
};
