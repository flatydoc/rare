import { Box, capitalize, Typography } from "@mui/material";

import damage from "../../../assets/damage.png";
import armor from "../../../assets/armor.png";
import hp from "../../../assets/hp.png";

import React from "react";
import { useGemStore } from "../../../core/store/useGemStore";
import { Element } from "../../../core/types";
import { CustomTooltip } from "../../../components/ui/CustomTooltip";
import {
  descriptionByElement,
  elementEmojis,
  MAX_GEM_CHAR_VALUE,
} from "../../SingleCardPage/constants";
import { getElementColor } from "../../../core/utils/getElementColor";
import { colors } from "../../../core/theme/colors";
import { booleanToString } from "../../../core/utils/booleanToString";
import { CardStat } from "../../SingleCardPage/components/CardStat";
import { centerContentStyles } from "../../../core/theme/common.style";
import { Ambient } from "../../../components/ui/Ambient";

export const GemInfo = ({ gemId }: { gemId: number }) => {
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
          <CustomTooltip
            key={index}
            title={capitalize(matchingElement)}
            text={descriptionByElement[matchingElement]}
          >
            <span
              style={{
                color: getElementColor(matchingElement),
                fontWeight: "bold",
                cursor: "help",
              }}
            >
              {coloredWord + (word.endsWith(",") ? "," : "")}
            </span>
          </CustomTooltip>
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
            maxWidth: "288px",
            padding: "40px",
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
            }}
          >
            {highlightElements(gem.description)}
          </Typography>
          <CustomTooltip title="If the gem is not removable, then if you insert it into the hero slot, you will not be able to get it">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
                width: "100%",
                cursor: "help",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: colors.secondaryTextColor,
                }}
              >
                Removable:
              </Typography>
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
          </CustomTooltip>
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

          {gem.element && (
            <Box
              sx={{
                mt: "12px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CustomTooltip
                title={capitalize(gem.element)}
                text={descriptionByElement[gem.element]}
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
                    cursor: "help",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: colors.secondaryTextColor,
                    }}
                  >
                    Damage type
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "48px",
                    }}
                  >
                    {elementEmojis[gem.element]}
                  </Typography>
                </Box>
              </CustomTooltip>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
