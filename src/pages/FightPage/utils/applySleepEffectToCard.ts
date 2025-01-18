import { StatusEffectId } from "../../../core/enums/statusEffects";
import { IFightCard } from "../../../core/types";
import { createStatusEffect } from "../../../core/utils/createStatusEffects";

export const applySleepEffectToCard = (card: IFightCard): IFightCard => ({
  ...card,
  statusEffects: [
    ...card.statusEffects,
    createStatusEffect(StatusEffectId.Sleep),
  ],
});
