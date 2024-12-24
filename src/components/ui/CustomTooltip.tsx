import { Box, Tooltip, Typography } from "@mui/material";
import { colors } from "../../core/theme/colors";

export const CustomTooltip = ({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children: React.ReactElement;
}) => {
  return (
    <Tooltip
      title={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            maxWidth: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "18px !important",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              color: colors.secondaryTextColor,
            }}
          >
            {text}
          </Typography>
        </Box>
      }
      placement="top-start"
    >
      {children}
    </Tooltip>
  );
};
