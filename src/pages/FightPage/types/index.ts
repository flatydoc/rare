import { ICard } from "../../../core/types";

export interface IFightCard extends ICard {
  fightHealth: number;
  fightDamage: number;
  fightArmor: number;
  statusEffects: IStatusEffect[];
}

export interface IStatusEffect {
  id: number;
  title?: string;
  text?: string;
  duration: number;
  icon: string;
}

export type DamageInfo = {
  id: number;
  damage: number;
  isCrit?: boolean;
  isMiss?: boolean;
}[];

export type HealInfo = {
  id: number;
  heal: number;
} | null;
