import { Box } from "@mui/material";
import { SingleFightCard } from "./SingleFightCard";
import { EmptyCardSlot } from "./EmptyCardSlot";
import { DamageInfo, HealInfo, IFightCard } from "../types";

export const FightCardsList = ({
  cards,
  event,
  selectedCardId,
  isMyCardList,
  onEmptySlotClick,
  reloadableCards,
  damageInfo,
  healInfo,
}: {
  cards: IFightCard[] | number[];
  event: (id: number) => void;
  selectedCardId: number | null;
  isMyCardList?: boolean;
  onEmptySlotClick?: (index: number) => void;
  reloadableCards: number[];
  damageInfo: DamageInfo;
  healInfo: HealInfo;
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        width: "100%",
      }}
    >
      {cards.map((card, index) =>
        typeof card === "number" ? (
          <EmptyCardSlot index={index} key={index} onClick={onEmptySlotClick} />
        ) : (
          <SingleFightCard
            key={card.id}
            card={card}
            isSelected={selectedCardId === card.id}
            onClick={event}
            isMyCard={isMyCardList}
            reloadableCards={reloadableCards}
            damageInfo={damageInfo}
            healInfo={healInfo}
          />
        )
      )}
    </Box>
  );
};
