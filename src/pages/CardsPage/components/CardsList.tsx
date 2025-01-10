import { Box, Typography } from "@mui/material";
import { ICard } from "../../../core/types";
import { SingleCard } from "./SingleCard";

export const CardsList = ({
  cards,
  event,
  selectedCardId,
}: {
  cards: ICard[];
  event: (id: number) => void;
  selectedCardId?: number | null;
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
      {cards.length > 0 ? (
        cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            isSelected={selectedCardId === card.id}
            onClick={event}
          />
        ))
      ) : (
        <Typography sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Предметы не найдены
        </Typography>
      )}
    </Box>
  );
};
