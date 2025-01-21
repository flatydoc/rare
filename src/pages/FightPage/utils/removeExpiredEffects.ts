import { StatusEffectId } from "../../../core/enums/statusEffects";
import { IFightCard } from "../../../core/types";

export const removeExpiredEffects = (card: IFightCard): IFightCard => {
  const hasFrostEffect = card.statusEffects.some(
    (effect) => effect.id === StatusEffectId.Frost
  );

  const hasFlameEffect = card.statusEffects.some(
    (effect) => effect.id === StatusEffectId.Flame
  );

  return {
    ...card,
    fightArmor: hasFlameEffect ? card.fightArmor : card.armor,
    fightDamage: hasFrostEffect ? card.fightDamage : card.damage,
  };
};
