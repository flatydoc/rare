import { StatusEffectId } from "../enums";
import { IFightCard } from "../types";
import { createStatusEffect } from "./createStatusEffects";

export const applySleepEffectToCard = (card: IFightCard): IFightCard => ({
  ...card,
  statusEffects: [
    ...card.statusEffects,
    createStatusEffect(StatusEffectId.Sleep),
  ],
});
