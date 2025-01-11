import { useEffect } from "react";
import { ICard } from "../types";
import { getRandomDamage } from "../utils/getRandomDamage";
import { animateAttack } from "../utils/animateAttack";

export const useEnemyAttack = (
  enemyCards: ICard[],
  myCards: ICard[],
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
      const availableEnemyCards = enemyCards.filter(
        (card) => card.health > 0 && !reloadableEnemyCards.includes(card.id)
      );

      const enemyAttackInterval = setInterval(() => {
        if (attackIndex < availableEnemyCards.length) {
          const enemyCard = availableEnemyCards[attackIndex];

          const validTargets = myCards.filter(
            (card) => typeof card === "object" && card.health > 0
          );
          if (validTargets.length === 0) {
            clearInterval(enemyAttackInterval);
            setIsPlayerTurn(true); // Если больше нечего атаковать, ход возвращается игроку
            return;
          }

          const targetIndex = Math.floor(Math.random() * validTargets.length);
          const targetCard = validTargets[targetIndex];

          const attackingCardElement = document.getElementById(
            `card-${enemyCard.id}`
          );
          const targetCardElement = document.getElementById(
            `card-${targetCard.id}`
          );

          if (attackingCardElement && targetCardElement) {
            animateAttack(attackingCardElement, targetCardElement, () => {
              const damage = getRandomDamage(enemyCard.damage);
              setMyCards((prevMyCards) =>
                prevMyCards.map((card) =>
                  card.id === targetCard.id
                    ? {
                        ...card,
                        health: Math.max(0, card.health - damage),
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
          }
        } else {
          clearInterval(enemyAttackInterval);
          setIsPlayerTurn(true); // Возвращаем ход игроку
          setReloadableEnemyCards([]);
          console.log("Your turn starts!");
        }
      }, 2000); // Задержка между атаками врага
    }
  }, [
    isFight,
    isPlayerTurn,
    reloadableEnemyCards,
    enemyCards,
    myCards,
    setMyCards,
    setReloadableEnemyCards,
    setIsPlayerTurn,
    setDamageInfo, // Добавляем в зависимости
  ]);
};
