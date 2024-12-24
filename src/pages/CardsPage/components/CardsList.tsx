import { Box, Rating, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { ICard } from "../../../core/types";
import { Ambient } from "../../../components/ui/Ambient";
import { elementEmojis, fractionEmojis } from "../../SingleCardPage/constants";
import { colors } from "../../../core/theme/colors";
import { getIconByCardClass } from "../../../core/utils/geIconByCardClass";
import { getCardImage } from "../../../core/utils/getCardImage";

export const CardsList = ({
  cards,
  event,
}: {
  cards: ICard[];
  event: (id: number) => void;
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        width: "100%",
      }}
    >
      {cards.length > 0 ? (
        cards.map((card) => {
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
                boxShadow: `0 1px 2px 0 inset ${getRarityColor(card.rarity)}`,
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
                  bottom: "12px",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
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
                {fractionEmojis[card.fraction]}
              </Typography>
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
                  bottom: "12px",
                }}
                width={24}
                height={24}
                src={getIconByCardClass(card.class)}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: "12px",
                  bottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  backgroundColor: "rgba(60, 60, 60, 0.5)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: colors.textColor,
                  }}
                >
                  {card.level}
                </Typography>
              </Box>
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
