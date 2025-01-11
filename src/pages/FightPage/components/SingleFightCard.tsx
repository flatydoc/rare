import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { ICard } from "../../../core/types";
import { colors } from "../../../core/theme/colors";
import { getCardImage } from "../../../core/utils/getCardImage";
import damage from "../../../assets/damage.png";
import armor from "../../../assets/armor.png";
import hp from "../../../assets/hp.png";
import { elementEmojis, fractionEmojis } from "../../SingleCardPage/constants";
import { getIconByCardClass } from "../../../core/utils/geIconByCardClass";

type DamageInfo = {
  id: number;
  damage: number;
} | null;

export const SingleFightCard = ({
  card,
  isSelected,
  onClick,
  isMyCard,
  reloadableCards,
  damageInfo,
}: {
  card: ICard;
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
  console.log(isMyCard);

  const isDead = card.health <= 0;
  const isReload = reloadableCards.includes(card.id);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          width: "100%",
          borderRadius: "20px",
          boxShadow:
            isSelected && !isReload ? `0 0 5px 1px ${colors.primary}` : "none",
          //   backgroundColor: "rgba(60, 60, 60, 0.8)",
          position: "relative",
          pointerEvents: isReload || isDead ? "none" : "auto",
          //   border: "1px solid #000",
        }}
      >
        {isReload && (
          <Box
            sx={{
              position: "absolute",
              top: "-100px",
              right: "0px",
              width: "100%",
              height: "100%",
              backdropFilter: `grayscale(1)`,
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
                const fontSize = 14 + index * 6; // Увеличение разбежки в размерах букв

                return (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      fontSize: `${fontSize}px`, // Увеличение разбежки в размере
                      fontWeight: "bold",
                      color: "rgba(255, 255, 255, 0.8)",
                      animation: `floatZ 2s ease-in-out infinite`,
                      animationDelay: `${0.5 + index * 0.5}s`, // Задержка начала анимации
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%)`, // Начальная позиция
                      opacity: 0, // Начальная прозрачность
                    }}
                  >
                    Z
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
        {damageInfo?.id === card.id && (
          <Typography
            sx={{
              position: "absolute",
              top: "20px",
              right: "0px",
              fontSize: "24px",
              fontWeight: "600",
              color: colors.red,
              animation: "damagePopup 1s ease-out",
            }}
          >
            -{damageInfo.damage}
          </Typography>
        )}
        {isDead && (
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              zIndex: 1,
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            }}
          />
        )}
        <Box
          id={`card-${card.id}`}
          sx={{
            ...centerContentStyles,
            flexDirection: "column",
            width: "100%",
            maxWidth: "240px",
            borderRadius: "20px",
            padding: "10px",
            aspectRatio: "1",
            willChange: "transform, opacity",
          }}
        >
          <img
            src={getCardImage(card.number, card.rarity)}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
          {/* <Box
            sx={{
              position: "absolute",
              zIndex: "-1",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "50%",
              height: "10%",
              borderRadius: "20px",
              backgroundColor: `${getRarityColor(card.rarity)}99`,
              filter: "blur(12px)",
              boxShadow: `0px 0px 20px ${getRarityColor(card.rarity)}99`,
            }}
          /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "12px 6px",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
              }}
            >
              {fractionEmojis[card.fraction]}
            </Typography>
            <img width={24} height={24} src={getIconByCardClass(card.class)} />
            <Typography
              sx={{
                fontSize: "24px",
              }}
            >
              {elementEmojis[card.element]}
            </Typography>
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
              { icon: hp, value: card.health + card.bonusHealth },
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
                    color:
                      stat.value === 0 && stat.icon === hp
                        ? colors.red
                        : colors.textColor,
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
