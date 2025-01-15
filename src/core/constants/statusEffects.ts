import { IStatusEffect } from "../types";

export const effectEmojis: Record<number, string> = {
  3: "💤",
  4: "☠️",
};

export const statusEffects: IStatusEffect[] = [
  {
    id: 3,
    title: `Sleep`,
    duration: 1,
    icon: effectEmojis[3],
  },
  {
    id: 3,
    title: `Sleep`,
    duration: 1,
    icon: effectEmojis[3],
  },
];
