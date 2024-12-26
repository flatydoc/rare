import { Box, Rating, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { ICard } from "../../../core/types";
import { Ambient } from "../../../components/ui/Ambient";
import { elementEmojis } from "../../SingleCardPage/constants";
import { colors } from "../../../core/theme/colors";
import { getIconByCardClass } from "../../../core/utils/geIconByCardClass";
import { getCardImage } from "../../../core/utils/getCardImage";
import { getBgByCardFraction } from "../../../core/utils/getBgByFraction";

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
        cards.map((card) => {
          const isSelected = selectedCardId === card.id;

          return (
            <Box
              onClick={() => event(card.id)}
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
                boxShadow: isSelected
                  ? `0 0 5px 1px ${
                      colors.primary
                    }, 0 1px 2px 0 inset ${getRarityColor(card.rarity)}`
                  : `0 1px 2px 0 inset ${getRarityColor(card.rarity)}`,
                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${getBgByCardFraction(
                  card.fraction
                )})`,
                backgroundSize: "cover",
              }}
            >
              <Ambient rarity={card.rarity}>
                <img
                  src={getCardImage(card.number, card.rarity)}
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
                    padding: "4px 8px",
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
                    {`Lvl. ${card.level}`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Rating
                    size="small"
                    value={card.stars}
                    readOnly
                    sx={{
                      "& .MuiRating-iconEmpty": {
                        color: "#fff",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Typography
                sx={{
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  fontSize: "16px",
                }}
              >
                {elementEmojis[card.element]}
              </Typography>
              <img
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                }}
                width={24}
                height={24}
                src={getIconByCardClass(card.class)}
              />
            </Box>
          );
        })
      ) : (
        <Typography sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Предметы не найдены
        </Typography>
      )}
    </Box>
  );
};
