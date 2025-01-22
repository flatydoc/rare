import { IFightCard } from "../types";

export const checkVictoryCondition = (
  enemyCards: IFightCard[],
  setIsWin: React.Dispatch<React.SetStateAction<boolean | null>>,
  setIsShowResult: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  const isVictory = enemyCards.every((card) => card.fightHealth === 0);
  if (isVictory) {
    setIsWin(true);
    setIsShowResult(true);
  }
  return isVictory;
};
