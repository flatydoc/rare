import { Box } from "@mui/material";
import { colors } from "../../../core/theme/colors";

export const CardStatProgress = ({
  progress,
  bonusProgress,
  isDashed = false,
  isNegative,
}: {
  progress: number;
  bonusProgress?: number;
  isDashed?: boolean;
  isNegative?: boolean;
}) => {
  const bonusWidth = isNegative
    ? bonusProgress !== undefined
      ? Math.min(progress, Math.abs(bonusProgress))
      : 0
    : bonusProgress || 0;

  return (
    <Box
      sx={{
        width: "100%",
        height: "8px",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF1A",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgb(35, 35, 35)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: colors.primary,
          height: "100%",
          borderRadius: bonusProgress ? "0" : "8px",
          width: `${progress}%`,
        }}
      />

      <Box
        sx={{
          background: isNegative ? "rgb(190, 0, 0)" : "rgb(0, 190, 0)",
          height: "100%",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          width: `${bonusWidth}%`,
        }}
      />

      {isDashed &&
        Array.from({ length: 10 }, (_, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: `${(index + 1) * 10}%`,
              width: "1px",
              height: "100%",
              backgroundColor: "rgb(35, 35, 35)",
            }}
          />
        ))}
    </Box>
  );
};
