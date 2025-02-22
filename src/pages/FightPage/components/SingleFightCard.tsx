import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { colors } from "../../../core/theme/colors";
import { getCardImage } from "../../../core/utils/getCardImage";
import damage from "../../../assets/damage.png";
import armor from "../../../assets/armor.png";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import tombstone from "../../../assets/tombstone.png";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { getRangeValue } from "../../../core/utils/getRangeValue";
import { DamageInfo, HealInfo, IFightCard } from "../types";

export const SingleFightCard = ({
  card,
  isSelected,
  onClick,
  isMyCard,
  reloadableCards,
  damageInfo,
  healInfo,
}: {
  card: IFightCard;
  isSelected?: boolean;
  onClick?: (id: number) => void;
  isMyCard?: boolean;
  reloadableCards: number[];
  damageInfo: DamageInfo;
  healInfo: HealInfo;
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
    }
  };

  const isDead = card.fightHealth <= 0;
  const isReload = reloadableCards.includes(card.id);
  const currentDamageInfo = damageInfo.find((info) => info.id === card.id);

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
                      key={`z-effect-${index}`}
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
        {currentDamageInfo && (
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
                color:
                  currentDamageInfo.damage >= 1
                    ? colors.red
                    : "rgba(225, 225, 225, 0.7)",
              }}
            >
              {currentDamageInfo.isMiss
                ? "Miss"
                : currentDamageInfo.damage < 1
                ? "Blocked"
                : `-${currentDamageInfo.damage.toFixed(0)}`}
            </Typography>
            {currentDamageInfo.isCrit && currentDamageInfo.damage > 0 && (
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
        {healInfo?.id === card.id && (
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
                color: colors.green,
              }}
            >
              +{healInfo.heal.toFixed(0)}
            </Typography>
          </Box>
        )}
        <Box
          id={`card-${card.id}`}
          sx={{
            ...centerContentStyles,
            flexDirection: "column",
            width: "100%",
            maxWidth: "240px",
            p: "10px 10px 0 10px",
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
            p: "0 6px 6px 6px",
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
                height: "20%",
                borderRadius: "20px",

                backgroundColor: isReload
                  ? `${getRarityColor("common")}99`
                  : `${getRarityColor(card.rarity)}99`,
                filter: "blur(12px)",
                boxShadow: `0px 0px 20px ${
                  isReload
                    ? `${getRarityColor("common")}99`
                    : `${getRarityColor(card.rarity)}99`
                }`,
              }}
            />
          )}
          <Box
            sx={{
              ...centerContentStyles,
              gap: "4px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "10px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {!isDead &&
                card.statusEffects.map((effect) => (
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
              {typeof currentDamageInfo?.damage === "number" && (
                <Box
                  sx={{
                    width: `${(currentDamageInfo.damage / card.health) * 100}%`,
                    height: "100%",
                    backgroundColor: currentDamageInfo.isCrit
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
                    color:
                      card.fightHealth === 0 ? colors.red : colors.textColor,
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
          </Box>
          {!isDead && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              {[
                {
                  icon: damage,
                  isDamage: true,
                  value: card.fightDamage,
                  affectedBy: "frost",
                  isStatReduced: card.fightDamage < card.damage,
                },
                {
                  icon: armor,
                  value: card.fightArmor,
                  affectedBy: "flame",
                  isStatReduced: card.fightArmor < card.armor,
                },
              ].map((stat, index) => (
                <Box
                  key={`stat-${index}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
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
                      color: stat.isStatReduced
                        ? "rgb(190, 0, 0)"
                        : colors.textColor,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {stat.isDamage
                      ? getRangeValue(stat.value)
                      : stat.value.toFixed(0)}
                    {stat.isStatReduced && (
                      <KeyboardArrowDownRoundedIcon
                        sx={{
                          fontSize: "inherit",
                          verticalAlign: "middle",
                          color: "rgb(190, 0, 0)",
                          marginLeft: "4px",
                        }}
                      />
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
