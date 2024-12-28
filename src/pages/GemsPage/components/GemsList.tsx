import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { IGem } from "../../../core/types";
import { Ambient } from "../../../components/ui/Ambient";
import { colors } from "../../../core/theme/colors";
import { elementEmojis } from "../../SingleCardPage/constants";
import damage from "../../../assets/damage.png";
import armor from "../../../assets/armor.png";
import hp from "../../../assets/hp.png";

export const GemsList = ({
  gems,
  event,
}: {
  gems: IGem[];
  event: (id: number) => void;
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px",
        width: "100%",
      }}
    >
      {gems.length > 0 ? (
        gems.map((gem) => {
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
                boxShadow: `0 1px 2px 0 inset ${getRarityColor(gem.rarity)}`,
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
                    backgroundColor: "rgba(60, 60, 60, 0.8)",
                    backdropFilter: "blur(1px)",
                    borderRadius: "12px",
                    padding: "4px 8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    whiteSpace: "nowrap",
                    gap: "2px",
                  }}
                >
                  {[
                    { icon: damage, value: gem.powerModifier },
                    { icon: armor, value: gem.armorModifier },
                    { icon: hp, value: gem.healthModifier },
                  ]
                    .filter((modifier) => modifier.value !== 0)
                    .map((modifier, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <img
                          src={modifier.icon}
                          alt="modifier icon"
                          style={{ width: "12px", height: "12px" }}
                        />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color:
                              modifier.value > 0
                                ? colors.green
                                : modifier.value < 0
                                ? colors.red
                                : colors.textColor,
                          }}
                        >
                          {modifier.value > 0
                            ? `+${modifier.value.toFixed(0)}`
                            : `${modifier.value.toFixed(0)}`}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
              {gem.element && (
                <Typography
                  sx={{
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                    fontSize: "16px",
                  }}
                >
                  {elementEmojis[gem.element]}
                </Typography>
              )}
              {gem.level > 1 && (
                <Typography
                  sx={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    fontSize: "10px",
                    color: colors.textColor,
                  }}
                >
                  {`+${gem.level}`}
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
