export interface IUser {
  id: number;
  telegramId: number;
  username: string | null;
  balance: number;
  energy: number;
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
  rarity: Rarity;
  price: number;
  priceCurrency: "inGame" | "ton";
  name: string;
  description: string;
}
