import { IFightCard } from "../../../core/types";

export const restoreOrcCardHealth = (
  card: IFightCard,
  damage: number,
  setHealInfo: React.Dispatch<
    React.SetStateAction<{
      id: number;
      heal: number;
    } | null>
  >
): IFightCard => {
  if (card.fraction === "demons") {
    const healAmount = Math.floor(damage * 0.2);

    if (card.fightHealth < card.health) {
      const updatedCard = {
        ...card,
        fightHealth: Math.min(card.health, card.fightHealth + healAmount),
      };

      if (updatedCard.fightHealth > card.fightHealth) {
        setHealInfo({ id: card.id, heal: healAmount });
      }

      return updatedCard;
    }
  }

  return card;
};
