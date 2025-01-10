import { ICard } from "../types";

export const calculateTotalPower = (card: ICard) => {
  return (
    card.damage +
    card.armor +
    card.health +
    card.bonusDamage +
    card.bonusArmor +
    card.bonusHealth
  );
};
