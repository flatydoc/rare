import { StatusEffectId } from "../../../core/enums/statusEffects";
import { IFightCard } from "../../../core/types";

export const removeSleepEffectsFromCards = (
  cards: IFightCard[]
): IFightCard[] =>
  cards.map((card) => ({
    ...card,
    statusEffects: card.statusEffects.filter(
      (effect) => effect.id !== StatusEffectId.Sleep
    ),
  }));
