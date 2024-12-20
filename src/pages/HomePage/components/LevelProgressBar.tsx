import { Box, Typography } from "@mui/material";
import { getLevelExperience } from "../../../core/utils/getLevelExperience";
import { colors } from "../../../core/theme/colors";
import { getLeagueByLevel } from "../../../core/utils/getLeagueByLevel";
import { imgByLeague } from "../constants";

export const LevelProgressBar = ({
  level,
  exp,
}: {
  level: number;
  exp: number;
}) => {
  const currentExp = BigInt(exp);

  let totalExpForCurrentLevel = 0n;
  for (let i = 1; i < level; i++) {
    totalExpForCurrentLevel += getLevelExperience(i);
  }
  const currentLevelExp = totalExpForCurrentLevel;
  const nextLevelExp = currentLevelExp + getLevelExperience(level);

  const levelExpProgress = currentExp - currentLevelExp;
  const totalExpNeeded = nextLevelExp - currentLevelExp;

  const clampedExp = Number(levelExpProgress);
  const totalExpNeededNumber = Number(totalExpNeeded);
  const progress = (clampedExp / totalExpNeededNumber) * 100;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
      }}
    >
      <img
        src={imgByLeague[getLeagueByLevel(level)]}
        style={{
          width: "24px",
          height: "24px",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            mb: "6px",
          }}
        >
          <Typography
            sx={{
              color: colors.textColor,
              fontSize: "14px",
            }}
          >
            {exp}
          </Typography>
          <Typography
            sx={{
              color: colors.secondaryTextColor,
              fontSize: "12px",
            }}
          >
            {level === 1
              ? `${getLeagueByLevel(level)}`
              : `${getLeagueByLevel(level)} League`}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "4px",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF1A",
            position: "relative",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              background: "#ffffff5e",
              height: "100%",
              borderRadius: "4px",
              width: `${progress}%`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
