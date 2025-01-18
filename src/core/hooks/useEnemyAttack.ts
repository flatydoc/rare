import { useEffect } from "react";
import { IFightCard } from "../types";
import { animateAttack } from "../utils/animateAttack";
import { removeSleepEffectsFromCards } from "../../pages/FightPage/utils/removeSleepEffectsFromCards";
import { updateCardState } from "../../pages/FightPage/utils/updateCardState";
import { applySleepEffectToCard } from "../../pages/FightPage/utils/applySleepEffectToCard";
import { restoreCardHealth } from "../../pages/FightPage/utils/restoreCardHealth";

export const useEnemyAttack = (
  enemyCards: IFightCard[],
  setMyCards: React.Dispatch<React.SetStateAction<IFightCard[]>>,
  reloadableEnemyCards: number[],
  setReloadableEnemyCards: React.Dispatch<React.SetStateAction<number[]>>,
  isFight: boolean,
  isPlayerTurn: boolean,
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>,
  setDamageInfo: React.Dispatch<
    React.SetStateAction<{
      id: number;
      damage: number;
      isCrit?: boolean;
      isMiss?: boolean;
    } | null>
  >,
  setHealInfo: React.Dispatch<
    React.SetStateAction<{
      id: number;
      heal: number;
    } | null>
  >,
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
                const { updatedCard: updatedTargetCard, damage } =
                  updateCardState(targetCard, enemyCard, setDamageInfo);

                const updatedEnemyCard = restoreCardHealth(
                  enemyCard,
                  damage,
                  setHealInfo
                );

                const updatedEnemyCardWithSleep =
                  applySleepEffectToCard(updatedEnemyCard);

                setMyCards((prevMyCards) =>
                  prevMyCards.map((card) =>
                    card.id === targetCard.id ? updatedTargetCard : card
                  )
                );

                setEnemyCards((prevEnemyCards) =>
                  prevEnemyCards.map((card) =>
                    card.id === enemyCard.id ? updatedEnemyCardWithSleep : card
                  )
                );

                setTimeout(() => setDamageInfo(null), 1000);
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
