import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { IFightCard } from "../../../core/types";
import { colors } from "../../../core/theme/colors";
import { getCardImage } from "../../../core/utils/getCardImage";
import damage from "../../../assets/damage.png";
import armor from "../../../assets/armor.png";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import tombstone from "../../../assets/tombstone.png";

type DamageInfo = {
  id: number;
  damage: number;
  isCrit?: boolean;
} | null;

export const SingleFightCard = ({
  card,
  isSelected,
  onClick,
  isMyCard,
  reloadableCards,
  damageInfo,
}: {
  card: IFightCard;
  isSelected?: boolean;
  onClick?: (id: number) => void;
  isMyCard?: boolean;
  reloadableCards: number[];
  damageInfo: DamageInfo;
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
    }
  };

  const isDead = card.fightHealth <= 0;
  const isReload = reloadableCards.includes(card.id);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          width: "100%",
          position: "relative",
          pointerEvents: isReload || isDead ? "none" : "auto",
          transition: "transform 0.3s ease",
          transform: isSelected
            ? isMyCard
              ? "translateY(-40px)"
              : "translateY(40px)"
            : "none",
        }}
      >
        {isReload && (
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0px",
              width: "100%",
              height: "100%",
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-100px",
                right: "0px",
                width: "100%",
                height: "100%",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {[...Array(3)].map((_, index) => {
                  const fontSize = 14 + index * 6;

                  return (
                    <Box
                      key={index}
                      sx={{
                        position: "absolute",
                        fontSize: `${fontSize}px`,
                        fontWeight: "bold",
                        color: "rgba(255, 255, 255, 0.8)",
                        animation: `floatZ 2s ease-in-out infinite`,
                        animationDelay: `${0.5 + index * 0.5}s`,
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%)`,
                        opacity: 0,
                      }}
                    >
                      Z
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
        {damageInfo?.id === card.id && (
          <Box
            sx={{
              ...centerContentStyles,
              gap: "4px",
              position: "absolute",
              top: "20px",
              right: "0px",
              animation: "damagePopup 1s ease-out",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "600",
                color: colors.red,
              }}
            >
              -{damageInfo.damage.toFixed(0)}
            </Typography>
            {damageInfo.isCrit && (
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                💥
              </Typography>
            )}
          </Box>
        )}
        <Box
          id={`card-${card.id}`}
          sx={{
            ...centerContentStyles,
            flexDirection: "column",
            width: "100%",
            maxWidth: "240px",
            padding: "10px",
            aspectRatio: "1",
            willChange: "transform, opacity",
          }}
        >
          <img
            src={isDead ? tombstone : getCardImage(card.number, card.rarity)}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              filter: isReload ? `grayscale(1)` : "none",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "6px",
            gap: "12px",
            position: "relative",
          }}
        >
          {!isDead && (
            <Box
              sx={{
                position: "absolute",
                zIndex: "-1",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
                height: "10%",
                borderRadius: "20px",
                backgroundColor: !isReload
                  ? `${getRarityColor(card.rarity)}99`
                  : `${getRarityColor("common")}99`,
                filter: "blur(12px)",
                boxShadow: `0px 0px 20px ${
                  !isReload
                    ? `${getRarityColor(card.rarity)}99`
                    : `${getRarityColor("common")}99`
                }`,
              }}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              left: "6px",
              width: "100%",
              height: "10px",
              zIndex: "2",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {card.statusEffects.map((effect) => (
              <Typography
                key={effect.id}
                sx={{
                  fontSize: "10px",
                  textShadow: `
                  -1px -1px 0 black,
                  1px -1px 0 black,
                  -1px 1px 0 black,
                  1px 1px 0 black
                `,
                }}
              >
                {effect.icon}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "16px",
              backgroundColor: "rgba(60, 60, 60, 0.5)",
              borderRadius: "16px",
              border: "1px solid #000",
              overflow: "hidden",
              position: "relative",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: `${(card.fightHealth / card.health) * 100}%`,
                height: "100%",
                backgroundColor: isMyCard ? colors.green : colors.red,
              }}
            />
            {damageInfo?.id === card.id && (
              <Box
                sx={{
                  width: `${(damageInfo.damage / card.health) * 100}%`,
                  height: "100%",
                  backgroundColor: damageInfo?.isCrit
                    ? "rgb(255, 230, 0)"
                    : "rgba(225, 225, 225, 0.7)",
                }}
              />
            )}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "10px",
                  color: card.fightHealth === 0 ? colors.red : colors.textColor,
                  textShadow: `
                            -1px -1px 0 black,
                            1px -1px 0 black,
                            -1px 1px 0 black,
                            1px 1px 0 black
                          `,
                }}
              >
                {card.fightHealth.toFixed(0)}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "10px",
                  color: colors.textColor,
                  textShadow: `
                           -1px -1px 0 black,
                           1px -1px 0 black,
                           -1px 1px 0 black,
                           1px 1px 0 black
                         `,
                }}
              >
                /
              </Typography>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "10px",
                  color: colors.textColor,
                  textShadow: `
                            -1px -1px 0 black,
                            1px -1px 0 black,
                            -1px 1px 0 black,
                            1px 1px 0 black
                          `,
                }}
              >
                {card.health.toFixed(0)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {[
              { icon: damage, value: card.damage + card.bonusDamage },
              { icon: armor, value: card.armor + card.bonusArmor },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <img
                  src={stat.icon}
                  alt="modifier icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: colors.textColor,
                  }}
                >
                  {stat.value.toFixed(0)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
