import { Box } from "@mui/material";
import { colors } from "../../../core/theme/colors";

export const CardStatProgress = ({
  progress,
  isDashed = false,
}: {
  progress: number;
  isDashed?: boolean;
}) => {
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
      }}
    >
      <Box
        sx={{
          background: colors.primary,
          height: "100%",
          borderRadius: "8px",
          width: `${progress}%`,
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
