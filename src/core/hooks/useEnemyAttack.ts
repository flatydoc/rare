import { useEffect } from "react";
import { ICard } from "../types";
import { getRandomDamage } from "../utils/getRandomDamage";
import { animateAttack } from "../utils/animateAttack";

export const useEnemyAttack = (
  enemyCards: ICard[],
  setMyCards: React.Dispatch<React.SetStateAction<ICard[]>>,
  reloadableEnemyCards: number[],
  setReloadableEnemyCards: React.Dispatch<React.SetStateAction<number[]>>,
  isFight: boolean,
  isPlayerTurn: boolean,
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>,
  setDamageInfo: React.Dispatch<
    React.SetStateAction<{ id: number; damage: number } | null>
  >
) => {
  useEffect(() => {
    if (isFight && !isPlayerTurn && reloadableEnemyCards.length === 0) {
      console.log("Enemy's turn starts!");

      let attackIndex = 0;

      const enemyAttackInterval = setInterval(() => {
        // Обновляем доступные для атаки карты врага
        const availableEnemyCards = enemyCards.filter(
          (card) =>
            card.fightHealth > 0 && !reloadableEnemyCards.includes(card.id)
        );

        if (availableEnemyCards.length === 0) {
          clearInterval(enemyAttackInterval);
          setIsPlayerTurn(true);
          console.log("Your turn starts!");
          return;
        }

        // Получаем список целей (живых карт) из актуального состояния
        setMyCards((prevMyCards) => {
          const validTargets = prevMyCards.filter(
            (card) => card.fightHealth > 0
          );

          if (validTargets.length === 0) {
            clearInterval(enemyAttackInterval);
            setIsPlayerTurn(true);
            console.log("No valid targets. Your turn starts!");
            return prevMyCards; // Возвращаем состояние без изменений
          }

          if (attackIndex < availableEnemyCards.length) {
            const enemyCard = availableEnemyCards[attackIndex];

            // Найти цель с минимальным количеством fightHealth
            const targetCard = validTargets.reduce((minCard, currentCard) =>
              currentCard.fightHealth < minCard.fightHealth
                ? currentCard
                : minCard
            );

            // Дополнительная проверка перед атакой
            if (!targetCard || targetCard.fightHealth <= 0) {
              console.log(
                `Skipping attack on dead or invalid target card ${targetCard?.id}`
              );
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
                console.log(
                  `Enemy card ${enemyCard.name} attacked your card ${targetCard.name}, causing ${damage} damage.`
                );

                setTimeout(() => setDamageInfo(null), 1000);

                setReloadableEnemyCards((prev) => [...prev, enemyCard.id]);
                attackIndex++;
              });
            } else {
              console.log(
                `Cannot find elements for enemy card ${enemyCard.id} or target card ${targetCard.id}`
              );
              attackIndex++;
            }
          } else {
            clearInterval(enemyAttackInterval);
            setIsPlayerTurn(true);
            setReloadableEnemyCards([]);
            console.log("Your turn starts!");
          }

          return prevMyCards; // Возвращаем актуальное состояние
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
  ]);
};
