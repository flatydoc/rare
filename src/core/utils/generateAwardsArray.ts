import { ICardPrototype } from "../types";

export const generateAwardsArray = (cardSlides: ICardPrototype[]) => {
  const result = [];
  const cardSlidesCount = cardSlides.length;

  for (let i = 0; i < 500; i++) {
    const randomIndex = Math.floor(Math.random() * cardSlidesCount);
    result.push(cardSlides[randomIndex]);
  }

  return result;
};
