import { Box, Typography } from "@mui/material";
import full_energy from "../../../assets/energy-full.png";
import { MAX_ENERGY } from "../../../core/constants";
import { colors } from "../../../core/theme/colors";
import gum from "../../../assets/gum.png";
import { formatNumber } from "../../../core/utils/formatNumber";
import { EnergyProgressBar } from "./EnergyProgressBar";
import cap from "../../../assets/cap.png";
import { RouteList } from "../../../core/enums";
import { useNavigate } from "react-router-dom";

export const UserStats = ({
  energy,
  balance,
}: {
  energy: number;
  balance: number;
}) => {
  const navigate = useNavigate();

  const userStatsCards = [
    {
      id: 1,
      label: "caps",
      value: 123,
      icon: cap,
      onClick: () => navigate(`/${RouteList.Cards}`),
    },
    {
      id: 2,
      value: formatNumber(balance),
      icon: gum,
    },
    {
      id: 3,
      value: energy,
      icon: full_energy,
    },
  ];

  return (
    <Box
      sx={{
        pt: "16px",
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {userStatsCards.map(({ id, value, icon, label, onClick }) => {
        const isEnergy = id === 3;
        const isCaps = id === 1;
        const progress = isEnergy ? (Number(value) / MAX_ENERGY) * 100 : 0;

        return (
          <Box
            onClick={isCaps ? onClick : undefined}
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              minHeight: "24px",
              padding: "12px",
              backgroundColor: "rgba(225, 225, 225, 0.2)",
              borderRadius: "17px",
              border: "1px solid rgb(15, 15, 15)",
              minWidth: "100px",
            }}
          >
            {icon && <img src={icon} height={24} />}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: colors.textColor,
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {value}
                {label && (
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "4px",
                    }}
                  >
                    {label}
                  </span>
                )}
                {isEnergy && (
                  <span
                    style={{
                      color: colors.secondaryTextColor,
                      fontSize: "10px",
                    }}
                  >
                    /{MAX_ENERGY}
                  </span>
                )}
              </Typography>
              {isEnergy && <EnergyProgressBar progress={progress} />}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
