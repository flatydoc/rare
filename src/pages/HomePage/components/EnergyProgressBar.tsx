import { Box } from "@mui/material";

export const EnergyProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "4px",
        borderRadius: "4px",
        backgroundColor: "#FFFFFF1A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background:
            progress < 21
              ? "red"
              : progress < 51
              ? "linear-gradient(to right, red, yellow)"
              : progress < 91
              ? "linear-gradient(to right, yellow, green)"
              : "green",
          height: "100%",
          borderRadius: "4px",
          width: `${progress}%`,
        }}
      />
    </Box>
  );
};
