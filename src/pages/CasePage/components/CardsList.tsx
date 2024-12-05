import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { ICard } from "../../../core/types";
import { getRarityColor } from "../../../core/utils/getRarityColor";

export const CardsList = ({ caseCards }: { caseCards: ICard[] }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        width: "100%",
        mt: 3,
      }}
    >
      {caseCards.length > 0 ? (
        caseCards.map((card) => (
          <Box
            key={card.id}
            sx={{
              ...centerContentStyles,
              overflow: "hidden",
              flexDirection: "column",
              width: "100%",
              maxWidth: "300px",
              padding: "12px 8px",
              border: `2px solid ${getRarityColor(card.rarity)}`,
              borderRadius: "20px",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "center",
                mb: 1,
              }}
            >
              {card.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
                mb: 1,
              }}
            >
              {card.description}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Цена: {card.price}{" "}
              {card.priceCurrency === "inGame" ? "игровых" : "TON"}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Карточки не найдены
        </Typography>
      )}
    </Box>
  );
};
