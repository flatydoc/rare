import { DamageInfo, IFightCard } from "../types";
import { applyStatusEffects } from "./applyStatusEffects";
import { calculateDamage } from "./calculateDamage";
import { updateCardHealth } from "./updateCardHealth";

export const updateCardState = (
  targetCards: IFightCard[],
  targetCardId: number,
  attackingCard: IFightCard,
  setDamageInfo: React.Dispatch<React.SetStateAction<DamageInfo>>
): { updatedCards: IFightCard[]; damage: number } => {
  let totalDamage = 0;

  const updatedCards = targetCards.map((card) => {
    if (card.id === targetCardId) {
      const { damage, isCrit, isMiss } = calculateDamage(attackingCard, card);

      if (isMiss) {
        setDamageInfo((prev) => [
          ...prev,
          { id: card.id, damage: 0, isMiss: true },
        ]);
        return card;
      }

      totalDamage = damage;

      const updatedHealthCard = updateCardHealth(card, damage);
      const updatedCard = applyStatusEffects(updatedHealthCard, attackingCard);

      setDamageInfo((prev) => [...prev, { id: card.id, damage, isCrit }]);
      return updatedCard;
    }

    return card;
  });

  if (attackingCard.element === "shock" && totalDamage > 0) {
    const shockDamage = Math.floor(totalDamage * 0.2);

    updatedCards.forEach((card) => {
      if (card.id !== targetCardId && card.fightHealth > 0) {
        const updatedHealthCard = updateCardHealth(card, shockDamage);

        setDamageInfo((prev) => [
          ...prev,
          { id: card.id, damage: shockDamage, isCrit: false },
        ]);

        Object.assign(card, updatedHealthCard);
      }
    });
  }

  return {
    updatedCards,
    damage: totalDamage,
  };
};
