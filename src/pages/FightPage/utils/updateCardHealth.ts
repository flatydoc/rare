import { IFightCard } from "../types";

export const updateCardHealth = (
  card: IFightCard,
  damage: number
): IFightCard => ({
  ...card,
  fightHealth: Math.max(0, card.fightHealth - damage),
});
