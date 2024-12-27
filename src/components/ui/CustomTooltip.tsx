import { Box, Tooltip, Typography } from "@mui/material";
import { formatTextWithElements } from "./formatTextWithElements";
import { colors } from "../../core/theme/colors";
import { useEffect, useState } from "react";
import { MainButton } from "../MainButton";

export const CustomTooltip = ({
  title,
  titleColor,
  text,
  children,
  openOnClick,
  btnText,
  event,
  timeout = 2,
}: {
  title: string | null;
  titleColor?: string;
  text?: string;
  children: React.ReactElement;
  openOnClick?: boolean;
  btnText?: string;
  event?: () => void;
  timeout?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!title) {
    return children;
  }

  const handleClick = () => {
    if (event) event();
  };

  const renderWithLineBreaks = (formattedText: string | undefined) => {
    if (!formattedText) return null;

    return formattedText.split("\n").map((line, index) => (
      <span key={index}>
        {formatTextWithElements(line)}
        <br />
      </span>
    ));
  };

  const handleTooltipToggle = () => {
    if (openOnClick) {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 1000 * timeout);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <Tooltip
      open={openOnClick ? isOpen : undefined}
      title={
        <Box
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
              color: titleColor || colors.textColor,
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
          {event && (
            <MainButton variant="small" fullWidth onClick={handleClick}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#000",
                }}
              >
                {btnText}
              </Typography>
            </MainButton>
          )}
        </Box>
      }
      placement="top-start"
    >
      <Box
        onClick={handleTooltipToggle}
        sx={{
          cursor: openOnClick ? "pointer" : "inherit",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Tooltip>
  );
};
