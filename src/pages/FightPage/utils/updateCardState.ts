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
    } | null>
  >
): { updatedCard: IFightCard; damage: number } => {
  const { damage, isCrit } = calculateDamage(attackingCard, targetCard);

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
