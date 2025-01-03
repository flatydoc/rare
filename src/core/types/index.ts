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
  level: number;
  number: number;
  inserted: boolean;
  rarity: Rarity;
  price: number;
  priceCurrency: "inGame" | "ton";
  name: string;
  description: string;
  tooltipTitle: string;
  img: string;
  powerModifier: number;
  armorModifier: number;
  healthModifier: number;
  element?: Element;
  gradeModifier: number;
  removable: boolean;
  kitId?: number;
}

export type CaseCategory = "free" | "exclusive";

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
  tier: Tier;
  price: number;
  power: number;
  bonusPower: number;
  powerCoef: number;
  health: number;
  bonusHealth: number;
  healthCoef: number;
  armor: number;
  bonusArmor: number;
  armorCoef: number;
  exp: number;
  level: number;
  stars: number;
  fraction: Fraction;
  priceCurrency: "inGame" | "ton";
  name: string;
  description: string;
  img: string;
  gemIds: (number | null)[];
  sockets: number;
  element: Element;
  class: CardClass;
}

export interface ICardPrototype {
  id: number;
  rarity: Rarity;
  tier: Tier;
  price: number;
  power: number;
  powerCoef: number;
  health: number;
  healthCoef: number;
  armor: number;
  armorCoef: number;
  fraction: Fraction;
  priceCurrency: "inGame" | "ton";
  name: string;
  description: string;
  img: string;
  sockets: number;
  element: Element;
  class: CardClass;
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
  | "holy"
  | "darkness"
  | "simple"
  | "poison";

export type CardClass = "defender" | "support" | "dd";
export type Tier = "B" | "A" | "S" | "S+";

export interface GemKit {
  id: number;
  name: string;
  description: string;
  gemIds: number[];
  powerModifier: number;
  armorModifier: number;
  healthModifier: number;
}
