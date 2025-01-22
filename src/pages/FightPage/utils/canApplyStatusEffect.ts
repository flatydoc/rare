import { Fraction } from "../../../core/types";
import { StatusEffectId } from "../enums";

export const immunityByFraction: Record<Fraction, StatusEffectId[]> = {
  alliance: [],
  undead: [StatusEffectId.Poison, StatusEffectId.Frost],
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
