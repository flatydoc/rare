import { StatusEffectId } from "../enums/statusEffects";
import { IStatusEffect } from "../types";

export const effectEmojis: Record<StatusEffectId, string> = {
  [StatusEffectId.Sleep]: "💤",
  [StatusEffectId.Poison]: "🦠",
};

export const createStatusEffect = (
  id: StatusEffectId,
  duration: number
): IStatusEffect => ({
  id,
  title: StatusEffectId[id],
  duration,
  icon: effectEmojis[id],
});
