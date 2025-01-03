import { ReactNode } from "react";
import { Box } from "@mui/material";
import { getRarityColor } from "../../core/utils/getRarityColor";
import { centerContentStyles } from "../../core/theme/common.style";
import { Rarity } from "../../core/types";

type LightProps = {
  rarity: Rarity;
  children: ReactNode;
  isAnimated?: boolean;
};

export const Ambient = ({
  rarity,
  children,
  isAnimated = false,
}: LightProps) => {
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
        filter: `drop-shadow(0 0 40px ${color})`,
        animation: isAnimated ? `flicker 2s infinite alternate` : "none",
        "@keyframes flicker": {
          "0%": {
            filter: `drop-shadow(0 0 30px ${color})`,
          },
          "50%": {
            filter: `drop-shadow(0 0 50px ${color})`,
          },
          "100%": {
            filter: `drop-shadow(0 0 40px ${color})`,
          },
        },
      }}
    >
      {children}
    </Box>
  );
};
