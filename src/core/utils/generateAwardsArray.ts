import { ICard } from "../types";

export const generateAwardsArray = (cardSlides: ICard[]) => {
  const cardSlidesCount = cardSlides.length;
  return Array(Math.round(200 / cardSlidesCount))
    .fill(null)
    .flatMap(() => [...cardSlides]);
};
