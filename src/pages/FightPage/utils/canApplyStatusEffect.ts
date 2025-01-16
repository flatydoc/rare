import { StatusEffectId } from "../../../core/enums/statusEffects";
import { Fraction } from "../../../core/types";

export const immunityByFraction: Record<Fraction, StatusEffectId[]> = {
  alliance: [],
  undead: [StatusEffectId.Poison], // Нежить невосприимчива к яду
  demons: [StatusEffectId.Flame], // Демоны невосприимчивы к пламени
  elves: [], // Нет иммунитетов
  orcs: [], // Нет иммунитетов
};

export const canApplyStatusEffect = (
  fraction: Fraction,
  effectId: StatusEffectId
): boolean => {
  return !(immunityByFraction[fraction] || []).includes(effectId);
};
