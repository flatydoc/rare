import { useEffect } from "react";
import { DamageInfo, HealInfo, IFightCard } from "../types";
import { removeSleepEffectsFromCards } from "../utils/removeSleepEffectsFromCards";
import { animateAttack } from "../utils/animateAttack";
import { updateCardState } from "../utils/updateCardState";
import { restoreCardHealth } from "../utils/restoreCardHealth";
import { applySleepEffectToCard } from "../utils/applySleepEffectToCard";
import { sortTargetsByPriority } from "../utils/sortTargetsByPriority";

export const useEnemyAttack = (
  enemyCards: IFightCard[],
  setMyCards: React.Dispatch<React.SetStateAction<IFightCard[]>>,
  reloadableEnemyCards: number[],
  setReloadableEnemyCards: React.Dispatch<React.SetStateAction<number[]>>,
  isFight: boolean,
  isPlayerTurn: boolean,
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>,
  setDamageInfo: React.Dispatch<React.SetStateAction<DamageInfo>>,
  setHealInfo: React.Dispatch<React.SetStateAction<HealInfo>>,
  setIsShowResult: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWin: React.Dispatch<React.SetStateAction<boolean | null>>,
  setEnemyCards: React.Dispatch<React.SetStateAction<IFightCard[]>>,
  setRound: React.Dispatch<React.SetStateAction<number>>
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

          setEnemyCards((prevEnemyCards) =>
            removeSleepEffectsFromCards(prevEnemyCards)
          );

          setIsPlayerTurn(true);
          setRound((prev) => prev + 1);
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
            const sortedTargets = sortTargetsByPriority(validTargets);
            const targetCard = sortedTargets[0];

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
                const { updatedCards, damage } = updateCardState(
                  prevMyCards,
                  targetCard.id,
                  enemyCard,
                  setDamageInfo
                );

                const updatedEnemyCard = restoreCardHealth(
                  enemyCard,
                  damage,
                  setHealInfo
                );

                const updatedEnemyCardWithSleep =
                  applySleepEffectToCard(updatedEnemyCard);

                setMyCards(updatedCards);

                setEnemyCards((prevEnemyCards) =>
                  prevEnemyCards.map((card) =>
                    card.id === enemyCard.id ? updatedEnemyCardWithSleep : card
                  )
                );

                setTimeout(() => setDamageInfo([]), 1000);
                setTimeout(() => setHealInfo(null), 1000);
                setReloadableEnemyCards((prev) => [...prev, enemyCard.id]);
                attackIndex++;
              });
            } else {
              attackIndex++;
            }
          } else {
            clearInterval(enemyAttackInterval);
            setEnemyCards((prevEnemyCards) =>
              removeSleepEffectsFromCards(prevEnemyCards)
            );
            setIsPlayerTurn(true);
            setRound((prev) => prev + 1);
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
    setEnemyCards,
    setIsShowResult,
    setIsWin,
    setRound,
  ]);
};
