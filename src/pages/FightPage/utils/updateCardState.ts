import { IFightCard } from "../types";
import { applyStatusEffects } from "./applyStatusEffects";
import { calculateDamage } from "./calculateDamage";
import { updateCardHealth } from "./updateCardHealth";

export const updateCardState = (
  targetCard: IFightCard,
  attackingCard: IFightCard,
  setDamageInfo: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        damage: number;
        isCrit?: boolean;
        isMiss?: boolean;
      }[]
    >
  >
): { updatedCard: IFightCard; damage: number } => {
  const { damage, isCrit, isMiss } = calculateDamage(attackingCard, targetCard);

  if (isMiss) {
    setDamageInfo((prev) => [
      ...prev,
      { id: targetCard.id, damage: 0, isMiss: true },
    ]);
    return { updatedCard: targetCard, damage: 0 };
  }

  const updatedHealthCard = updateCardHealth(targetCard, damage);

  const updatedCard = applyStatusEffects(updatedHealthCard, attackingCard);

  setDamageInfo((prev) => [...prev, { id: targetCard.id, damage, isCrit }]);

  return {
    updatedCard,
    damage,
  };
};

// import { IFightCard } from "../../../core/types";
// import { applyStatusEffects } from "./applyStatusEffects";
// import { calculateDamage } from "./calculateDamage";
// import { updateCardHealth } from "./updateCardHealth";

// export const updateCardState = (
//   targetCard: IFightCard,
//   attackingCard: IFightCard,
//   targetCards: IFightCard[], // Передаем все карты врагов
//   setDamageInfo: React.Dispatch<
//     React.SetStateAction<
//       {
//         id: number;
//         damage: number;
//         isCrit?: boolean;
//         isMiss?: boolean;
//       }[]
//     >
//   >
// ): {
//   updatedCard: IFightCard;
//   damage: number;
//   updatedTargetCards: IFightCard[];
// } => {
//   const { damage, isCrit, isMiss } = calculateDamage(attackingCard, targetCard);

//   // Если атака промахнулась
//   if (isMiss) {
//     setDamageInfo((prev) => [
//       ...prev,
//       { id: targetCard.id, damage: 0, isMiss: true },
//     ]);
//     return {
//       updatedCard: targetCard,
//       damage: 0,
//       updatedTargetCards: targetCards,
//     };
//   }

//   // Обновляем здоровье карты-цели
//   const updatedHealthCard = updateCardHealth(targetCard, damage);

//   // Применяем статус-эффекты
//   const updatedCard = applyStatusEffects(updatedHealthCard, attackingCard);

//   // Обновляем информацию о нанесенном уроне
//   setDamageInfo((prev) => [...prev, { id: targetCard.id, damage, isCrit }]);

//   // Если у атакующей карты элемент "shock", наносим дополнительный урон остальным живым врагам
//   if (attackingCard.element === "shock") {
//     // Вычисляем 20% от урона для каждого живого врага
//     const shockDamage = damage * 0.2;

//     const updatedTargetCards = targetCards.map((card) => {
//       if (card.fightHealth > 0 && card.id !== targetCard.id) {
//         // Наносим дополнительный урон по живым врагам
//         const updatedEnemyCard = updateCardHealth(card, shockDamage);
//         setDamageInfo((prev) => [
//           ...prev,
//           { id: updatedEnemyCard.id, damage: shockDamage },
//         ]);
//         return updatedEnemyCard; // Возвращаем обновленную карту врага
//       }
//       return card; // Возвращаем неизмененную карту
//     });

//     return {
//       updatedCard,
//       damage,
//       updatedTargetCards, // Возвращаем обновленные карты врагов
//     };
//   }

//   return {
//     updatedCard,
//     damage,
//     updatedTargetCards: targetCards, // Если элемент не "shock", возвращаем оригинальные карты врагов
//   };
// };
