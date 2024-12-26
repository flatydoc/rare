import { Box, Typography, Popover, IconButton } from "@mui/material";
import { formatTextWithElements } from "./formatTextWithElements";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info"; // Пример иконки для клика

export const CustomTooltip = ({
  title,
  text,
  children,
}: {
  title: string | null;
  text?: string;
  children: React.ReactElement;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // Показать или скрыть Popover
  };

  const open = Boolean(anchorEl);
  const id = open ? "custom-tooltip-popover" : undefined;

  const renderWithLineBreaks = (formattedText: string | undefined) => {
    if (!formattedText) return null;

    return formattedText.split("\n").map((line, index) => (
      <span key={index}>
        {formatTextWithElements(line)}
        <br />
      </span>
    ));
  };

  if (!title) {
    return children;
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClick}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            maxWidth: "300px",
            padding: "8px",
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
      </Popover>
      {children}
    </>
  );
};
