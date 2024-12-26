import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { IGem } from "../../../core/types";
import { Ambient } from "../../../components/ui/Ambient";
import { colors } from "../../../core/theme/colors";
import { elementEmojis } from "../../SingleCardPage/constants";

export const GemsList = ({
  gems,
  event,
  selectedGemId,
}: {
  gems: IGem[];
  event: (id: number) => void;
  selectedGemId?: number | null;
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
      {gems.length > 0 ? (
        gems.map((gem) => {
          const isSelected = selectedGemId === gem.id;

          return (
            <Box
              onClick={() => event(gem.id)}
              key={gem.id}
              sx={{
                ...centerContentStyles,
                overflow: "hidden",
                flexDirection: "column",
                width: "100%",
                borderRadius: "20px",
                position: "relative",
                padding: "20px",
                aspectRatio: "1",
                boxShadow: isSelected
                  ? `0 0 5px 1px ${
                      colors.primary
                    }, 0 1px 2px 0 inset ${getRarityColor(gem.rarity)}`
                  : `0 1px 2px 0 inset ${getRarityColor(gem.rarity)}`,
              }}
            >
              <Ambient rarity={gem.rarity}>
                <img
                  src={gem.img}
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
                    {gem.name}
                  </Typography>
                </Box>
              </Box>
              {gem.element && (
                <Typography
                  sx={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    fontSize: "16px",
                  }}
                >
                  {elementEmojis[gem.element]}
                </Typography>
              )}
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
