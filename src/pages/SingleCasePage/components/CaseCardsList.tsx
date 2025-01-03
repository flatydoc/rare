import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { ICardPrototype } from "../../../core/types";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { getBgByCardFraction } from "../../../core/utils/getBgByFraction";
import { Ambient } from "../../../components/ui/Ambient";
import { colors } from "../../../core/theme/colors";

export const CaseCardsList = ({
  caseCards,
}: {
  caseCards: ICardPrototype[];
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Сontent
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
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
                borderRadius: "20px",
                position: "relative",
                padding: "10px",
                aspectRatio: "1",
                boxShadow: `0 1px 2px 0 inset ${getRarityColor(card.rarity)}`,
                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${getBgByCardFraction(
                  card.fraction
                )})`,
                backgroundSize: "cover",
              }}
            >
              <Ambient rarity={card.rarity}>
                <img
                  src={card.img}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Ambient>

              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: "6px",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(60, 60, 60, 0.5)",
                    borderRadius: "40px",
                    padding: "6px 12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography
                    sx={{
                      color: colors.textColor,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {card.name}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                  fontSize: "16px",
                }}
              >
                {card.tier}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
            Карточки не найдены
          </Typography>
        )}
      </Box>
    </Box>
  );
};
