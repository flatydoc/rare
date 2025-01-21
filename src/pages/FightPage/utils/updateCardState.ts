import { IFightCard } from "../../../core/types";
import { applyStatusEffects } from "./applyStatusEffects";
import { calculateDamage } from "./calculateDamage";
import { updateCardHealth } from "./updateCardHealth";

export const updateCardState = (
  targetCard: IFightCard,
  attackingCard: IFightCard,
  setDamageInfo: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        damage: number;
        isCrit?: boolean;
        isMiss?: boolean;
      }[]
    >
  >
): { updatedCard: IFightCard; damage: number } => {
  const { damage, isCrit, isMiss } = calculateDamage(attackingCard, targetCard);

  if (isMiss) {
    setDamageInfo((prev) => [
      ...prev,
      { id: targetCard.id, damage: 0, isMiss: true },
    ]);
    return { updatedCard: targetCard, damage: 0 };
  }

  const updatedHealthCard = updateCardHealth(targetCard, damage);

  const updatedCard = applyStatusEffects(updatedHealthCard, attackingCard);

  setDamageInfo((prev) => [...prev, { id: targetCard.id, damage, isCrit }]);

  return {
    updatedCard,
    damage,
  };
};
