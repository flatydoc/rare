import { Box, Tooltip, Typography } from "@mui/material";
import { formatTextWithElements } from "./formatTextWithElements";
import { useState } from "react";

export const CustomTooltip = ({
  title,
  text,
  children,
}: {
  title: string | null;
  text?: string;
  children: React.ReactElement;
}) => {
  if (!title) {
    return children;
  }

  const renderWithLineBreaks = (formattedText: string | undefined) => {
    if (!formattedText) return null;

    return formattedText.split("\n").map((line, index) => (
      <span key={index}>
        {formatTextWithElements(line)}
        <br />
      </span>
    ));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "custom-tooltip-popover" : undefined;

  return (
    <Tooltip
      title={
        <Box
          id={id}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            maxWidth: "300px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "18px !important",
            }}
          >
            {title}
          </Typography>
          {text && (
            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: "14px !important",
                fontWeight: "400",
                color: "#b8b8b8",
              }}
            >
              {renderWithLineBreaks(text)}
            </Typography>
          )}
        </Box>
      }
      placement="top-start"
    >
      <Box onClick={handleClick}>{children}</Box>
    </Tooltip>
  );
};
