import { CardClass, Element, Fraction } from "../../core/types";

export const MAX_GEM_CHAR_VALUE = 100;
export const MAX_CARD_CHAR_VALUE = 1000;

export const elementEmojis: Record<Element, string> = {
  flame: "🔥",
  frost: "❄️",
  shock: "⚡️",
  earth: "🍃",
  holy: "🌝",
  darkness: "🌚",
  simple: "⚔️",
  poison: "🧪",
};

export const descriptionByClass: Record<CardClass, string> = {
  defender: "Defender description",
  fighter: "Fighter description",
  support: "support description",
};

export const descriptionByFraction: Record<Fraction, string> = {
  alliance:
    "• Gains #+15%# health for each ally from the #Alliance# fraction. \n• #+20%# against the #Undead# fraction. \n• Takes #80%# less damage from holy attacks.",
  undead:
    "• Gains #+30%# attack for each allied hero killed. \n• Immune to poison and frost effects. \n• Takes #70%# less damage from darkness attacks.",
  demons:
    "• #+20%# against the #Alliance# fraction. \n• #15%# lifesteal on attack. \n• Immune to flame effects.",
  elves:
    "• #20%# chance to evade attacks. \n• #25%# chance to ignore armor when attacking. \n• Takes #50%# less damage from earth attacks.",
  orcs: "• Gains #+30%# damage when the hero’s health is below #50%#. \n• #30%# chance to deal #150%# critical damage on attack.",
};

export const descriptionByElement: Record<Element, string> = {
  flame: "flame damage",
  frost: "frost damage",
  shock: "shock damage",
  earth: "earth damage",
  holy: "holy damage",
  darkness: "darkness damage",
  simple:
    "• No special bonuses, but is unaffected by elemental resistances. \n• Provides a consistent and reliable damage source.",
  poison: "poison damage",
};

export const fractionEmojis: Record<Fraction, string> = {
  alliance: "🤵‍♂️",
  undead: "☠️",
  demons: "👹",
  elves: "🧑‍🎤",
  orcs: "👨‍🎤",
};

export const SLOT_POSITIONS: Record<number, { x: number; y: number }[]> = {
  1: [{ x: 0, y: 0 }],
  2: [
    { x: -111.73, y: 0 },
    { x: 111.73, y: 0 },
  ],
  3: [
    { x: 0, y: -128.585 },
    { x: -111.73, y: 64.283 },
    { x: 111.73, y: 64.283 },
  ],
  4: [
    { x: -111.73, y: -111.73 },
    { x: 111.73, y: -111.73 },
    { x: -111.73, y: 111.73 },
    { x: 111.73, y: 111.73 },
  ],
  5: [
    { x: 0, y: -128.585 },
    { x: -122.46, y: -38.86 },
    { x: -86.57, y: 101.63 },
    { x: 86.57, y: 101.63 },
    { x: 122.46, y: -38.86 },
  ],
  6: [
    { x: -137.79, y: 0 },
    { x: -67.76, y: 116.125 },
    { x: 67.76, y: 116.125 },
    { x: 137.79, y: 0 },
    { x: 67.76, y: -116.125 },
    { x: -67.76, y: -116.125 },
  ],
};

export const calculateSlotPositions = (sockets: number) =>
  SLOT_POSITIONS[sockets] || [];
