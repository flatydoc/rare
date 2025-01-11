import { useEffect } from "react";
import { ICard } from "../types";
import { getRandomDamage } from "../utils/getRandomDamage";

export const useEnemyAttack = (
  enemyCards: ICard[],
  myCards: ICard[],
  setMyCards: React.Dispatch<React.SetStateAction<ICard[]>>,
  attackedEnemyCards: number[],
  setAttackedEnemyCards: React.Dispatch<React.SetStateAction<number[]>>,
  isFight: boolean,
  isPlayerTurn: boolean,
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>,
  setDamageInfo: React.Dispatch<
    React.SetStateAction<{ id: number; damage: number } | null>
  >
) => {
  useEffect(() => {
    if (isFight && !isPlayerTurn && attackedEnemyCards.length === 0) {
      console.log("Enemy's turn starts!");

      let attackIndex = 0;
      const availableEnemyCards = enemyCards.filter(
        (card) => card.health > 0 && !attackedEnemyCards.includes(card.id)
      );

      const enemyAttackInterval = setInterval(() => {
        if (attackIndex < availableEnemyCards.length) {
          const enemyCard = availableEnemyCards[attackIndex];

          // Фильтруем только карты игрока с health > 0
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
            const attackingRect = attackingCardElement.getBoundingClientRect();
            const targetRect = targetCardElement.getBoundingClientRect();

            const deltaX = targetRect.left - attackingRect.left;
            const deltaY = targetRect.top - attackingRect.top;

            // Этап 1: Резкий рывок вперед
            attackingCardElement.style.transition =
              "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
            attackingCardElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

            setTimeout(() => {
              // Этап 2: Быстрое возвращение с вибрацией
              attackingCardElement.style.transition = "transform 0.3s ease";
              attackingCardElement.style.transform = `translate(${
                deltaX * 0.1
              }px, ${deltaY * 0.1}px)`;

              setTimeout(() => {
                // Этап 3: Возврат в исходное положение
                attackingCardElement.style.transition = "transform 0.2s ease";
                attackingCardElement.style.transform = "translate(0, 0)";

                // Наносим урон
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

                // Устанавливаем информацию о нанесённом уроне
                setDamageInfo({ id: targetCard.id, damage });
                console.log(
                  `Enemy card ${enemyCard.name} attacked your card ${targetCard.name}, causing ${damage} damage.`
                );

                // Сбрасываем информацию о нанесённом уроне через 1 секунду
                setTimeout(() => setDamageInfo(null), 1000);

                // Добавляем текущую карту противника в список атакованных
                setAttackedEnemyCards((prev) => [...prev, enemyCard.id]);
                attackIndex++;
              }, 100); // Длительность вибрации
            }, 200); // Длительность рывка вперед
          }
        } else {
          clearInterval(enemyAttackInterval);
          setIsPlayerTurn(true); // Возвращаем ход игроку
          setAttackedEnemyCards([]);
          console.log("Your turn starts!");
        }
      }, 2000); // Задержка между атаками врага
    }
  }, [
    isFight,
    isPlayerTurn,
    attackedEnemyCards,
    enemyCards,
    myCards,
    setMyCards,
    setAttackedEnemyCards,
    setIsPlayerTurn,
    setDamageInfo, // Добавляем в зависимости
  ]);
};
