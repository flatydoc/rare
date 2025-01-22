import { StatusEffectId } from "../enums";
import { IFightCard } from "../types";

export const removeSleepEffectsFromCards = (
  cards: IFightCard[]
): IFightCard[] =>
  cards.map((card) => ({
    ...card,
    statusEffects: card.statusEffects.filter(
      (effect) => effect.id !== StatusEffectId.Sleep
    ),
  }));
