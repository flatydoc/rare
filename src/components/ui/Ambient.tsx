import { ReactNode } from "react";
import { Box } from "@mui/material";
import { getRarityColor } from "../../core/utils/getRarityColor";
import { centerContentStyles } from "../../core/theme/common.style";
import { Rarity } from "../../core/types";

type LightProps = {
  rarity: Rarity;
  children: ReactNode;
};

export const Ambient = ({ rarity, children }: LightProps) => {
  const color = getRarityColor(rarity);
  return (
    <Box
      sx={{
        ...centerContentStyles,
        transform: "translateZ(0)",
        objectFit: "contain",
        borderRadius: "50%",
        width: "100%",
        height: "100%",
      }}
      style={{
        filter: `drop-shadow(0 0 40px ${color}`,
      }}
    >
      {children}
    </Box>
  );
};
