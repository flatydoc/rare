import { StatusEffectId } from "../enums/statusEffects";
import { IStatusEffect } from "../types";

export const effectEmojis: Record<StatusEffectId, string> = {
  [StatusEffectId.Sleep]: "💤",
  [StatusEffectId.Poison]: "🦠",
  [StatusEffectId.Flame]: "❤️‍🔥",
  [StatusEffectId.Darkness]: "🪦",
  [StatusEffectId.Frost]: "🥶",
  [StatusEffectId.Earth]: "💫",
};

const effectDetails: Record<
  StatusEffectId,
  { title: string; text: string; duration: number }
> = {
  [StatusEffectId.Sleep]: {
    title: "Sleep",
    text: "The target is incapacitated and unable to act for the duration.",
    duration: 1,
  },
  [StatusEffectId.Poison]: {
    title: "Poisoning",
    text: "The poisoned target receives damage over time equal to 5% of maximum health.",
    duration: 2,
  },
  [StatusEffectId.Flame]: {
    title: "Burning",
    text: "",
    duration: 2,
  },
  [StatusEffectId.Darkness]: {
    title: "Curse",
    text: "",
    duration: 4,
  },
  [StatusEffectId.Frost]: {
    title: "Freezing",
    text: "",
    duration: 2,
  },
  [StatusEffectId.Earth]: {
    title: "Stun",
    text: "",
    duration: 1,
  },
};

export const createStatusEffect = (id: StatusEffectId): IStatusEffect => {
  const { title, text, duration } = effectDetails[id];

  return {
    id,
    title,
    text,
    duration,
    icon: effectEmojis[id],
  };
};
