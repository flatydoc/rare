import { useEffect } from "react";
import { IFightCard } from "../types";
import { getRandomDamage } from "../utils/getRandomDamage";
import { animateAttack } from "../utils/animateAttack";
import { createStatusEffect } from "../utils/createStatusEffects";
import { StatusEffectId } from "../enums/statusEffects";

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
  setIsWin: React.Dispatch<React.SetStateAction<boolean | null>>,
  setEnemyCards: React.Dispatch<React.SetStateAction<IFightCard[]>>,
  setRound: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    if (isFight && !isPlayerTurn && reloadableEnemyCards.length === 0) {
      let attackIndex = 0;
      const attackedEnemyCardIds: number[] = [];
      const enemyAttackInterval = setInterval(() => {
        const availableEnemyCards = enemyCards.filter(
          (card) =>
            card.fightHealth > 0 && !reloadableEnemyCards.includes(card.id)
        );

        if (availableEnemyCards.length === 0) {
          clearInterval(enemyAttackInterval);
          setIsPlayerTurn(true);
          setRound((prev) => ++prev);
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
                const newHealth = Math.max(0, targetCard.fightHealth - damage);

                const updatedMyCards = prevMyCards.map((card) => {
                  if (card.id === targetCard.id) {
                    let newStatusEffects = [...card.statusEffects];

                    if (enemyCard.element && enemyCard.element !== "simple") {
                      const effectKey =
                        enemyCard.element.charAt(0).toUpperCase() +
                        enemyCard.element.slice(1).toLowerCase();
                      const effectId =
                        StatusEffectId[
                          effectKey as keyof typeof StatusEffectId
                        ];

                      const existingEffectIndex = newStatusEffects.findIndex(
                        (effect) => effect.id === effectId
                      );

                      if (existingEffectIndex !== -1) {
                        // Увеличение `duration` существующего эффекта
                        newStatusEffects = newStatusEffects.map(
                          (effect, index) =>
                            index === existingEffectIndex
                              ? { ...effect, duration: effect.duration + 2 }
                              : effect
                        );
                      } else {
                        // Добавление нового эффекта
                        newStatusEffects.push(createStatusEffect(effectId, 2));
                      }
                    }

                    return {
                      ...card,
                      fightHealth: newHealth,
                      statusEffects: newStatusEffects,
                    };
                  }
                  return card;
                });

                setMyCards(updatedMyCards);
                setDamageInfo({ id: targetCard.id, damage });

                setTimeout(() => setDamageInfo(null), 1000);

                setReloadableEnemyCards((prev) => [...prev, enemyCard.id]);
                attackedEnemyCardIds.push(enemyCard.id);
                attackIndex++;
              });
            } else {
              attackIndex++;
            }
          } else {
            clearInterval(enemyAttackInterval);
            setIsPlayerTurn(true);
            setRound((prev) => ++prev);
            setReloadableEnemyCards([]);

            setEnemyCards((prevEnemyCards) =>
              prevEnemyCards.map((card) =>
                attackedEnemyCardIds.includes(card.id)
                  ? {
                      ...card,
                      statusEffects: card.statusEffects.filter(
                        (effect) => effect.id !== StatusEffectId.Sleep
                      ),
                    }
                  : card
              )
            );
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
