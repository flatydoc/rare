import { IFightCard } from "../types";

// Функция для сортировки карт по приоритетам
export const sortTargetsByPriority = (cards: IFightCard[]): IFightCard[] => {
  return cards.sort((a, b) => {
    // Приоритет 1: карты с class === "support"
    if (a.class === "support" && b.class !== "support") return -1;
    if (a.class !== "support" && b.class === "support") return 1;

    // Приоритет 2: карты с минимальным fightHealth
    if (a.fightHealth !== b.fightHealth) {
      return a.fightHealth - b.fightHealth;
    }

    // Приоритет 3: карты с element === "shock"
    if (a.element === "shock" && b.element !== "shock") return -1;
    if (a.element !== "shock" && b.element === "shock") return 1;

    return 0; // Если все равны, то возвращаем их в исходном порядке
  });
};
