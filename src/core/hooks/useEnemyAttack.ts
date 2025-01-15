import { useEffect } from "react";
import { IFightCard } from "../types";
import { getRandomDamage } from "../utils/getRandomDamage";
import { animateAttack } from "../utils/animateAttack";

export const useEnemyAttack = (
  enemyCards: IFightCard[],
  setMyCards: React.Dispatch<React.SetStateAction<IFightCard[]>>,
  reloadableEnemyCards: number[],
  setReloadableEnemyCards: React.Dispatch<React.SetStateAction<number[]>>,
  isFight: boolean,
  isPlayerTurn: boolean,
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>,
  setDamageInfo: React.Dispatch<
    React.SetStateAction<{ id: number; damage: number } | null>
  >,
  setIsShowResult: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWin: React.Dispatch<React.SetStateAction<boolean | null>>
) => {
  useEffect(() => {
    if (isFight && !isPlayerTurn && reloadableEnemyCards.length === 0) {
      let attackIndex = 0;

      const enemyAttackInterval = setInterval(() => {
        const availableEnemyCards = enemyCards.filter(
          (card) =>
            card.fightHealth > 0 && !reloadableEnemyCards.includes(card.id)
        );

        if (availableEnemyCards.length === 0) {
          clearInterval(enemyAttackInterval);
          setIsPlayerTurn(true);
          return;
        }

        setMyCards((prevMyCards) => {
          const validTargets = prevMyCards.filter(
            (card) => card.fightHealth > 0
          );

          if (validTargets.length === 0) {
            clearInterval(enemyAttackInterval);
            setIsWin(false);
            setIsShowResult(true);
            return prevMyCards;
          }

          if (attackIndex < availableEnemyCards.length) {
            const enemyCard = availableEnemyCards[attackIndex];

            const targetCard = validTargets.reduce((minCard, currentCard) =>
              currentCard.fightHealth < minCard.fightHealth
                ? currentCard
                : minCard
            );

            if (!targetCard || targetCard.fightHealth <= 0) {
              attackIndex++;
              return prevMyCards;
            }

            const attackingCardElement = document.getElementById(
              `card-${enemyCard.id}`
            );
            const targetCardElement = document.getElementById(
              `card-${targetCard.id}`
            );

            if (attackingCardElement && targetCardElement) {
              animateAttack(attackingCardElement, targetCardElement, () => {
                const damage = getRandomDamage(enemyCard.damage);
                setMyCards((currentMyCards) =>
                  currentMyCards.map((card) =>
                    card.id === targetCard.id
                      ? {
                          ...card,
                          fightHealth: Math.max(0, card.fightHealth - damage),
                        }
                      : card
                  )
                );

                setDamageInfo({ id: targetCard.id, damage });
                setTimeout(() => setDamageInfo(null), 1000);
                setReloadableEnemyCards((prev) => [...prev, enemyCard.id]);
                attackIndex++;
              });
            } else {
              attackIndex++;
            }
          } else {
            clearInterval(enemyAttackInterval);
            setIsPlayerTurn(true);
            setReloadableEnemyCards([]);
          }

          return prevMyCards;
        });
      }, 2000);
    }
  }, [
    isFight,
    isPlayerTurn,
    reloadableEnemyCards,
    enemyCards,
    setMyCards,
    setReloadableEnemyCards,
    setIsPlayerTurn,
    setDamageInfo,
    setIsShowResult,
    setIsWin,
  ]);
};
