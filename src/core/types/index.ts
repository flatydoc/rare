export interface IUser {
  id: number;
  telegramId: number;
  username: string | null;
  balance: number;
  energy: number;
  exp: number;
  level: number;
  cards: number[];
  cases: number[];
  gems: number[];
}

export interface ICase {
  id: number;
  category: CaseCategory;
  rarity: Rarity;
  price: number;
  priceCurrency: "inGame" | "ton";
  name: string;
  description: string;
  cardIds: number[];
  img?: string;
}

export interface IGem {
  id: number;
  rarity: Rarity;
  price: number;
  priceCurrency: "inGame" | "ton";
  name: string;
  description: string;
  img: string;
  powerModifier: number;
  healthModifier: number;
  gradeModifier: number;
  removable: boolean;
}

export type CaseCategory = "free" | "hit" | "exclusive" | "event" | "promo";

export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "mythical"
  | "legendary"
  | "epic"
  | "immortal"
  | "ancient";

export interface ICard {
  id: number;
  number: number;
  rarity: Rarity;
  price: number;
  power: number;
  powerCoef: number;
  health: number;
  healthCoef: number;
  armor: number;
  armorCoef: number;
  exp: number;
  level: number;
  stars: number;
  fraction: Fraction;
  priceCurrency: "inGame" | "ton";
  name: string;
  description: string;
  img: string;
  gemIds: number[];
  sockets: number;
  element: Element;
  class: CardClass;
}

export interface IInventoryItem {
  id: number;
  rarity: Rarity;
  name: string;
  price?: number;
  priceCurrency?: string;
  description?: string;
  img?: string;
  type: "case" | "card";
  element?: Element;
  fraction?: Fraction;
  stars?: number;
  level?: number;
  class?: CardClass;
}

export interface IReward {
  id: number;
  league: string;
  reward: string;
  rewardColor: string;
  rewardValue?: number;
  rewardType: RewardType;
  isClaimed: boolean;
}

export type RewardType = "inGame" | "pack" | "not" | "ton";
export type Fraction = "alliance" | "undead" | "demons" | "elves" | "orcs";

export type Element =
  | "flame"
  | "frost"
  | "shock"
  | "earth"
  | "light"
  | "darkness"
  | "simple"
  | "poison";

export type CardClass = "defender" | "support" | "dd";
