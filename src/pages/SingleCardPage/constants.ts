import { CardClass, Element, Fraction } from "../../core/types";

export const MAX_CHAR_VALUE = 1000;

export const elementEmojis: Record<Element, string | null> = {
  flame: "🔥",
  frost: "❄️",
  shock: "⚡️",
  earth: "🍃",
  light: "🌝",
  darkness: "🌚",
  simple: null,
  poison: "🧪",
};

export const descriptionByClass: Record<CardClass, string> = {
  defender: "Defender description",
  dd: "DD description",
  support: "support description",
};

export const descriptionByFraction: Record<Fraction, string> = {
  alliance: "Alliance description",
  undead: "Undead description",
  demons: "Demons description",
  elves: "Elves description",
  orcs: "Orcs description",
};

export const descriptionByElement: Record<Element, string> = {
  flame: "Flame damage",
  frost: "Frost damage",
  shock: "Shock damage",
  earth: "Earth damage",
  light: "Light damage",
  darkness: "Darkness damage",
  simple: "Simple damage",
  poison: "Poison damage",
};

export const fractionEmojis: Record<Fraction, string> = {
  alliance: "🤵‍♂️",
  undead: "☠️",
  demons: "👹",
  elves: "🧑‍🎤",
  orcs: "👨‍🎤",
};

const SLOT_POSITIONS: Record<number, { x: number; y: number }[]> = {
  1: [{ x: 0, y: 0 }],
  2: [
    { x: -91.8, y: 0 },
    { x: 91.8, y: 0 },
  ],
  3: [
    { x: 0, y: -106.488 },
    { x: -91.8, y: 53.244 },
    { x: 91.8, y: 53.244 },
  ],
  4: [
    { x: -91.8, y: -91.8 },
    { x: 91.8, y: -91.8 },
    { x: -91.8, y: 91.8 },
    { x: 91.8, y: 91.8 },
  ],
  5: [
    { x: 0, y: -106.488 },
    { x: -100.98, y: -33.048 },
    { x: -62.424, y: 86.292 },
    { x: 62.424, y: 86.292 },
    { x: 100.98, y: -33.048 },
  ],
  6: [
    { x: -111.078, y: 0 },
    { x: -55.539, y: 96.1605 },
    { x: 55.539, y: 96.1605 },
    { x: 111.078, y: 0 },
    { x: 55.539, y: -96.1605 },
    { x: -55.539, y: -96.1605 },
  ],
};

export const calculateSlotPositions = (sockets: number) =>
  SLOT_POSITIONS[sockets] || [];
