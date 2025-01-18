import { IFightCard } from "../../../core/types";
import { applyStatusEffects } from "./applyStatusEffects";
import { calculateDamage } from "./calculateDamage";
import { updateCardHealth } from "./updateCardHealth";

export const updateCardState = (
  targetCard: IFightCard,
  attackingCard: IFightCard,
  setDamageInfo: React.Dispatch<
    React.SetStateAction<{
      id: number;
      damage: number;
      isCrit?: boolean;
      isMiss?: boolean;
    } | null>
  >
): { updatedCard: IFightCard; damage: number } => {
  const { damage, isCrit, isMiss } = calculateDamage(attackingCard, targetCard);

  if (isMiss) {
    setDamageInfo({ id: targetCard.id, damage: 0, isMiss: true });
    return { updatedCard: targetCard, damage: 0 };
  }

  const updatedHealthCard = updateCardHealth(targetCard, damage);

  const updatedStatusEffects = applyStatusEffects(
    updatedHealthCard,
    attackingCard
  );

  setDamageInfo({ id: targetCard.id, damage, isCrit });

  return {
    updatedCard: {
      ...updatedHealthCard,
      statusEffects: updatedStatusEffects,
    },
    damage,
  };
};
