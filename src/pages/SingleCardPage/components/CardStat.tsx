import { Box, Typography } from "@mui/material";
import { colors } from "../../../core/theme/colors";
import { MAX_CHAR_VALUE } from "../constants";
import { getRangeValue } from "../../../core/utils/getRangeValue";
import { CustomTooltip } from "../../../components/ui/CustomTooltip";
import { CardStatProgress } from "./CardStatProgress";
import { getLevelExperience } from "../../../core/utils/getLevelExperience";

export const CardStat = ({
  label,
  value,
  exp,
  icon,
  tooltipText,
  tooltipSubtitle,
}: {
  label: string;
  value: number;
  exp?: number;
  icon?: string;
  tooltipText: string;
  tooltipSubtitle?: string;
}) => {
  const isPower = label === "Power";
  const isLevel = label === "Level";

  let progress = 0;

  if (isLevel && exp) {
    const currentExp = BigInt(exp);

    let totalExpForCurrentLevel = 0n;
    for (let i = 1; i < value; i++) {
      totalExpForCurrentLevel += BigInt(getLevelExperience(i));
    }
    const currentLevelExp = totalExpForCurrentLevel;
    const nextLevelExp = currentLevelExp + BigInt(getLevelExperience(value));

    const levelExpProgress = currentExp - currentLevelExp;
    const totalExpNeeded = nextLevelExp - currentLevelExp;

    const clampedExp = Number(levelExpProgress);
    const totalExpNeededNumber = Number(totalExpNeeded);
    progress = (clampedExp / totalExpNeededNumber) * 100;
  } else {
    progress = Math.min((value / MAX_CHAR_VALUE) * 100, 100);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "100%",
        }}
      >
        <CustomTooltip title={tooltipText} text={tooltipSubtitle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: colors.secondaryTextColor,
                }}
              >
                {label}:
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {isPower ? getRangeValue(value) : value.toFixed(0)}
              </Typography>
            </Box>
            {icon && <img src={icon} width={24} height={24} />}
          </Box>
        </CustomTooltip>
        <CardStatProgress isDashed={!isLevel} progress={progress} />
      </Box>
    </Box>
  );
};
