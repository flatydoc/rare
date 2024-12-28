import { Box, capitalize, IconButton, Typography } from "@mui/material";

import damage from "../../../assets/damage.png";
import armor from "../../../assets/armor.png";
import hp from "../../../assets/hp.png";

import React from "react";
import { useGemStore } from "../../../core/store/useGemStore";
import { Element } from "../../../core/types";
import { CustomTooltip } from "../../../components/ui/CustomTooltip";
import {
  elementEmojis,
  MAX_GEM_CHAR_VALUE,
} from "../../SingleCardPage/constants";
import { getElementColor } from "../../../core/utils/getElementColor";
import { colors } from "../../../core/theme/colors";
import { booleanToString } from "../../../core/utils/booleanToString";
import { CardStat } from "../../SingleCardPage/components/CardStat";
import { centerContentStyles } from "../../../core/theme/common.style";
import { Ambient } from "../../../components/ui/Ambient";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { gemKits } from "../../../core/constants";

export const GemInfo = ({
  gemId,
  gemIds,
}: {
  gemId: number;
  gemIds?: number[] | null;
}) => {
  const gem = useGemStore((state) => state.getGemById(gemId));

  if (!gem) return null;

  const gemStats = [
    {
      label: "Power",
      value: gem.powerModifier,
      icon: damage,
      tooltipText: "Damage a hero can do",
      tooltipSubtitle: "Damage may vary by 15%",
    },
    {
      label: "Armor",
      value: gem.armorModifier,
      icon: armor,
      tooltipText: "Armor reduces damage taken",
    },
    {
      label: "Health",
      value: gem.healthModifier,
      icon: hp,
      tooltipText: "The more health a hero has, the more damage he can survive",
    },
  ].filter((stat) => stat.value !== 0);

  const elements: Element[] = [
    "flame",
    "frost",
    "shock",
    "earth",
    "holy",
    "darkness",
    "simple",
    "poison",
  ];

  const highlightElements = (text: string): JSX.Element[] => {
    return text.split(" ").map((word, index) => {
      const cleanWord = word.replace(/[.,!?]/g, "").toLowerCase();
      const matchingElement = elements.find((el) => el === cleanWord);

      if (matchingElement) {
        const coloredWord =
          matchingElement[0].toUpperCase() + matchingElement.slice(1);
        return (
          <span
            style={{
              color: getElementColor(matchingElement),
              fontWeight: "bold",
            }}
          >
            {coloredWord + (word.endsWith(",") ? "," : "")}
          </span>
        );
      }

      return <React.Fragment key={index}>{word} </React.Fragment>;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
          width: "100%",
        }}
      >
        <Box
          style={{
            ...centerContentStyles,
            flexDirection: "column",
            width: "100%",
            maxWidth: "100px",
            padding: "20px",
            borderRadius: "50%",
            position: "relative",
            aspectRatio: "1",
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            backgroundColor: "rgba(60, 60, 60, 0.5)",
            borderRadius: "20px",
            padding: "24px 12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              color: colors.textColor,
            }}
          >
            {gem.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: colors.secondaryTextColor,
              lineHeight: "20px !important",
              mb: "12px",
              width: "100%",
              wordBreak: "normal",
              overflowWrap: "normal",
            }}
          >
            {highlightElements(gem.description)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              gap: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0",
              }}
            >
              <CustomTooltip
                openOnClick
                title="If the gem is not removable, then if you insert it into the hero slot, you will not be able to get it"
              >
                <IconButton
                  sx={{
                    color: colors.secondaryTextColor,
                    padding: "4px",
                  }}
                >
                  <InfoOutlinedIcon
                    sx={{
                      width: "12px",
                      height: "12px",
                      cursor: "help",
                    }}
                  />
                </IconButton>
              </CustomTooltip>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: colors.secondaryTextColor,
                }}
              >
                Removable:
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: colors.textColor,
              }}
            >
              {booleanToString(gem.removable)}
            </Typography>
          </Box>
          {gemStats.map((stat, index) => (
            <CardStat
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              tooltipText={stat.tooltipText}
              tooltipSubtitle={stat.tooltipSubtitle}
              maxValue={MAX_GEM_CHAR_VALUE}
              isGem
            />
          ))}

          {gemKits
            .filter((kit) => kit.gemIds.includes(gem.id))
            .map((kit, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "rgba(60, 60, 60, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "100%",
                  borderRadius: "20px",
                  padding: "16px",
                  m: "12px 0",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: colors.textColor,
                  }}
                >
                  {kit.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: colors.secondaryTextColor,
                  }}
                >
                  {kit.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    m: "6px 0",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: colors.textColor,
                    }}
                  >
                    Bonuses:
                  </Typography>
                  {[
                    { label: "Power", value: kit.powerModifier },
                    { label: "Armor", value: kit.armorModifier },
                    { label: "Health", value: kit.healthModifier },
                  ]
                    .filter((stat) => stat.value > 0)
                    .map((stat) => (
                      <Typography
                        key={stat.label}
                        sx={{
                          fontSize: "14px",
                          color: colors.green,
                        }}
                      >
                        <span
                          style={{
                            color: colors.secondaryTextColor,
                            fontWeight: "600",
                          }}
                        >
                          {stat.label}:
                        </span>{" "}
                        +{stat.value}
                      </Typography>
                    ))}
                </Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: colors.textColor,
                  }}
                >
                  Gems in the kit:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {kit.gemIds.map((kitGemId) => {
                    const kitGem = useGemStore((state) =>
                      state.getGemById(kitGemId)
                    );
                    const isHighlighted = gemIds?.includes(kitGemId);
                    const isCurrentGem = kitGemId === gemId;
                    return (
                      <Typography
                        key={kitGemId}
                        sx={{
                          fontSize: "14px",
                          color: isCurrentGem
                            ? colors.textColor
                            : isHighlighted
                            ? colors.blue
                            : colors.secondaryTextColor,
                          fontWeight:
                            isCurrentGem || isHighlighted ? "600" : "normal",
                        }}
                      >
                        {`• ${kitGem?.name}`}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            ))}
          {gem.element && (
            <Box
              sx={{
                mt: "12px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <CustomTooltip
                    openOnClick
                    title={capitalize(gem.element)}
                    text={"Changes damage type to flame"}
                  >
                    <IconButton
                      sx={{
                        color: colors.secondaryTextColor,
                        zIndex: 1,
                        position: "absolute",
                        left: "-20px",
                        padding: "4px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <InfoOutlinedIcon
                        sx={{
                          width: "12px",
                          height: "12px",
                          cursor: "help",
                        }}
                      />
                    </IconButton>
                  </CustomTooltip>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: colors.secondaryTextColor,
                    }}
                  >
                    Damage type
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "48px",
                  }}
                >
                  {elementEmojis[gem.element]}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
