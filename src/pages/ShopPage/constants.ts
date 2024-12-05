import { ICase } from "../../core/types";

export const cases: ICase[] = [
  {
    id: 21,
    category: "exclusive",
    rarity: "rare",
    price: 150,
    priceCurrency: "ton",
    name: "Elite Case",
    description: "Only available for premium members.",
    cardIds: [1, 2, 3, 4, 5], // Пример карточек, которые могут выпасть из этого кейса
  },
  {
    id: 22,
    category: "exclusive",
    rarity: "mythical",
    price: 300,
    priceCurrency: "ton",
    name: "Mystic Vault",
    description: "Contains rare and mystical treasures.",
    cardIds: [6, 7, 8, 9, 10], // Пример карточек
  },
  {
    id: 23,
    category: "exclusive",
    rarity: "legendary",
    price: 500,
    priceCurrency: "ton",
    name: "Royal Chest",
    description: "For the true kings and queens.",
    cardIds: [11, 12, 13, 14, 15], // Пример карточек
  },
  {
    id: 24,
    category: "exclusive",
    rarity: "ancient",
    price: 700,
    priceCurrency: "ton",
    name: "Ancient Artifact",
    description: "Unlock the secrets of the past.",
    cardIds: [16, 17, 18, 19, 20], // Пример карточек
  },
  {
    id: 25,
    category: "exclusive",
    rarity: "immortal",
    price: 1000,
    priceCurrency: "ton",
    name: "Immortal Legacy",
    description: "A case for the immortals.",
    cardIds: [2, 4, 6, 8, 10], // Пример карточек
  },
  {
    id: 26,
    category: "event",
    rarity: "common",
    price: 10,
    priceCurrency: "inGame",
    name: "Spring Bloom",
    description: "Celebrate the spring season.",
    cardIds: [1, 3, 5], // Пример карточек
  },
  {
    id: 27,
    category: "event",
    rarity: "uncommon",
    price: 20,
    priceCurrency: "inGame",
    name: "Summer Splash",
    description: "A refreshing summer special.",
    cardIds: [4, 6, 7], // Пример карточек
  },
  {
    id: 28,
    category: "event",
    rarity: "rare",
    price: 30,
    priceCurrency: "inGame",
    name: "Autumn Harvest",
    description: "Bountiful rewards await you.",
    cardIds: [5, 8, 9], // Пример карточек
  },
  {
    id: 29,
    category: "event",
    rarity: "legendary",
    price: 50,
    priceCurrency: "inGame",
    name: "Winter Wonderland",
    description: "A magical winter case.",
    cardIds: [10, 12, 15], // Пример карточек
  },
  {
    id: 30,
    category: "event",
    rarity: "mythical",
    price: 100,
    priceCurrency: "inGame",
    name: "New Year's Eve",
    description: "Ring in the new year with style.",
    cardIds: [13, 14, 16], // Пример карточек
  },
  {
    id: 31,
    category: "promo",
    rarity: "common",
    price: 5,
    priceCurrency: "inGame",
    name: "Starter Promo",
    description: "An exclusive deal for new users.",
    cardIds: [1, 4, 5], // Пример карточек
  },
  {
    id: 32,
    category: "promo",
    rarity: "uncommon",
    price: 15,
    priceCurrency: "inGame",
    name: "Special Offer",
    description: "Limited time promotional case.",
    cardIds: [3, 6, 8], // Пример карточек
  },
  {
    id: 33,
    category: "promo",
    rarity: "rare",
    price: 25,
    priceCurrency: "inGame",
    name: "VIP Promo",
    description: "Only for our valued users.",
    cardIds: [2, 9, 10], // Пример карточек
  },
  {
    id: 34,
    category: "promo",
    rarity: "legendary",
    price: 75,
    priceCurrency: "inGame",
    name: "Legendary Deal",
    description: "Get legendary rewards at a discounted price.",
    cardIds: [11, 14, 15], // Пример карточек
  },
  {
    id: 35,
    category: "promo",
    rarity: "immortal",
    price: 200,
    priceCurrency: "inGame",
    name: "Immortal Promo",
    description: "The rarest of deals.",
    cardIds: [12, 13, 17], // Пример карточек
  },
  {
    id: 1,
    category: "free",
    rarity: "common",
    price: 0,
    priceCurrency: "inGame",
    name: "Starter Pack",
    description: "A free case for beginners.",
    cardIds: [1, 2], // Пример карточек
  },
  {
    id: 2,
    category: "hit",
    rarity: "rare",
    price: 10,
    priceCurrency: "ton",
    name: "Lucky Strike",
    description: "A chance to win big prizes.",
    cardIds: [3, 6, 8], // Пример карточек
  },
  {
    id: 3,
    category: "hit",
    rarity: "uncommon",
    price: 5,
    priceCurrency: "ton",
    name: "Beginner's Fortune",
    description: "A popular choice for new players.",
    cardIds: [4, 7, 9], // Пример карточек
  },
  {
    id: 4,
    category: "free",
    rarity: "common",
    price: 0,
    priceCurrency: "inGame",
    name: "Daily Reward",
    description: "Claim your daily free case.",
    cardIds: [1, 5], // Пример карточек
  },
  {
    id: 5,
    category: "hit",
    rarity: "mythical",
    price: 50,
    priceCurrency: "ton",
    name: "Mythic Box",
    description: "A chance to win mythical items.",
    cardIds: [10, 12], // Пример карточек
  },
  {
    id: 6,
    category: "hit",
    rarity: "legendary",
    price: 100,
    priceCurrency: "ton",
    name: "Legend's Chest",
    description: "Only for the bold and daring.",
    cardIds: [13, 15], // Пример карточек
  },
  {
    id: 7,
    category: "free",
    rarity: "common",
    price: 0,
    priceCurrency: "inGame",
    name: "Welcome Gift",
    description: "A token of appreciation for joining us.",
    cardIds: [1, 3], // Пример карточек
  },
];
