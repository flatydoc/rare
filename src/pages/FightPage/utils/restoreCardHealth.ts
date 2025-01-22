import { StatusEffectId } from "../enums";
import { IFightCard } from "../types";

export const restoreCardHealth = (
  card: IFightCard,
  damage: number,
  setHealInfo: React.Dispatch<
    React.SetStateAction<{
      id: number;
      heal: number;
    } | null>
  >
): IFightCard => {
  const hasDarknessEffect = card.statusEffects.some(
    (effect) => effect.id === StatusEffectId.Darkness
  );

  if (hasDarknessEffect) {
    return card;
  }

  let healAmount = 0;

  if (card.fraction === "demons") {
    healAmount += Math.floor(damage * 0.2);
  }

  if (card.element === "holy") {
    healAmount += Math.floor(damage * 0.1);
  }

  if (healAmount > 0 && card.fightHealth < card.health) {
    const updatedCard = {
      ...card,
      fightHealth: Math.min(card.health, card.fightHealth + healAmount),
    };

    if (updatedCard.fightHealth > card.fightHealth) {
      setHealInfo({ id: card.id, heal: healAmount });
    }

    return updatedCard;
  }

  return card;
};
