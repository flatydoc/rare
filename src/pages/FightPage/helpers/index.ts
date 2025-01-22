import { IFightCard } from "../types";

export const findCardById = (cards: IFightCard[], id: number) =>
  cards.find((card) => card.id === id);

export const updateCardInArray = (
  cards: IFightCard[],
  updatedCard: IFightCard
): IFightCard[] =>
  cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));

export const filterAliveCards = (cards: IFightCard[]) =>
  cards.filter((card) => card.fightHealth > 0);
