import { Box, IconButton, Typography } from "@mui/material";
import { colors } from "../../../core/theme/colors";
import { getRangeValue } from "../../../core/utils/getRangeValue";
import { CustomTooltip } from "../../../components/ui/CustomTooltip";
import { CardStatProgress } from "./CardStatProgress";
import { getLevelExperience } from "../../../core/utils/getLevelExperience";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const CardStat = ({
  label,
  value,
  bonusValue,
  exp,
  icon,
  tooltipText,
  tooltipSubtitle,
  maxValue,
  isGem,
}: {
  label: string;
  value: number;
  bonusValue?: number;
  exp?: number;
  icon?: string;
  tooltipText: string;
  tooltipSubtitle?: string;
  maxValue: number;
  isGem?: boolean;
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
    progress = Math.min((value / maxValue) * 100, 100);
  }

  const bonusProgress = bonusValue
    ? Math.min((bonusValue / maxValue) * 100, 100)
    : undefined;

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
              gap: "4px",
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
                title={tooltipText}
                text={tooltipSubtitle}
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
                {label}:
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: value < 0 ? "red" : colors.textColor,
                whiteSpace: "nowrap",
              }}
            >
              {isPower && !isGem ? getRangeValue(value) : value.toFixed(0)}
            </Typography>
            {bonusValue !== undefined && bonusValue !== 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: "2px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: bonusValue < 0 ? "rgb(190, 0, 0)" : "rgb(0, 190, 0)",
                  }}
                >
                  {`(`}
                  {bonusValue}
                  {bonusValue > 0 ? (
                    <KeyboardArrowUpRoundedIcon
                      sx={{
                        fontSize: "inherit",
                        verticalAlign: "middle",
                        color: "rgb(0, 190, 0)",
                      }}
                    />
                  ) : (
                    <KeyboardArrowDownRoundedIcon
                      sx={{
                        fontSize: "inherit",
                        verticalAlign: "middle",
                        color: "rgb(190, 0, 0)",
                      }}
                    />
                  )}
                  {`)`}
                </Typography>
              </Box>
            )}
          </Box>
          {icon && <img src={icon} width={24} height={24} />}
        </Box>
        {value > 0 && (
          <CardStatProgress
            isNegative={bonusValue !== undefined && bonusValue < 0}
            bonusProgress={bonusProgress}
            isDashed={!isLevel}
            progress={progress}
          />
        )}
      </Box>
    </Box>
  );
};
