import { Box, Tooltip, Typography } from "@mui/material";
import { colors } from "../../core/theme/colors";
import { useEffect, useState } from "react";
import { MainButton } from "../MainButton";
import { renderWithLineBreaks } from "./renderWithLineBreaks";
import { gemKits } from "../../core/constants";
import { useGemStore } from "../../core/store/useGemStore";

export const CustomTooltip = ({
  title,
  titleColor,
  text,
  children,
  openOnClick,
  btnText,
  event,
  timeout = 2,
  gemId,
  gemIds,
}: {
  title: string | null;
  titleColor?: string;
  text?: string;
  children: React.ReactElement;
  openOnClick?: boolean;
  btnText?: string;
  event?: () => void;
  timeout?: number;
  gemId?: number;
  gemIds?: number[] | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!title) {
    return children;
  }

  const handleClick = () => {
    if (event) event();
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
          {gemId && gemIds && (
            <Box
              sx={{
                width: "100%",
              }}
            >
              {gemKits
                .filter((kit) => kit.gemIds.includes(gemId))
                .map((kit, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: "rgba(60, 60, 60, 0.5)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      width: "100%",
                      borderRadius: "20px",
                      padding: "16px",
                      m: "12px 0",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: colors.textColor,
                      }}
                    >
                      {kit.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        m: "6px 0",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: colors.textColor,
                        }}
                      >
                        Bonuses:
                      </Typography>
                      {[
                        { label: "Power", value: kit.powerModifier },
                        { label: "Armor", value: kit.armorModifier },
                        { label: "Health", value: kit.healthModifier },
                      ]
                        .filter((stat) => stat.value > 0)
                        .map((stat) => (
                          <Typography
                            key={stat.label}
                            sx={{
                              fontSize: "14px",
                              color: colors.green,
                            }}
                          >
                            <span
                              style={{
                                color: colors.secondaryTextColor,
                                fontWeight: "600",
                              }}
                            >
                              {stat.label}:
                            </span>{" "}
                            +{stat.value}
                          </Typography>
                        ))}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: colors.textColor,
                      }}
                    >
                      Gems in the kit:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {kit.gemIds.map((kitGemId) => {
                        const kitGem = useGemStore((state) =>
                          state.getGemById(kitGemId)
                        );
                        const isHighlighted = gemIds?.includes(kitGemId);
                        return (
                          <Typography
                            key={kitGemId}
                            sx={{
                              fontSize: "14px",
                              color: isHighlighted
                                ? colors.blue
                                : colors.secondaryTextColor,
                              fontWeight: isHighlighted ? "600" : "normal",
                            }}
                          >
                            {`• ${kitGem?.name}`}
                          </Typography>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
            </Box>
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
