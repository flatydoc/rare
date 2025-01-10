import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { ICase } from "../../../core/types";
import { NavLink } from "react-router-dom";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { RouteList } from "../../../core/enums";
import { Ambient } from "../../../components/ui/Ambient";
import { colors } from "../../../core/theme/colors";

export const CasesList = ({ cases }: { cases: ICase[] }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        width: "100%",
      }}
    >
      {cases.length > 0 ? (
        cases.map((item) => (
          <NavLink
            to={`/${RouteList.Shop}/${item.id}`}
            key={item.id}
            style={{
              ...centerContentStyles,
              overflow: "hidden",
              flexDirection: "column",
              width: "100%",
              maxWidth: "240px",
              borderRadius: "20px",
              position: "relative",
              padding: "10px",
              aspectRatio: "1",
              boxShadow: `0 1px 2px 0 inset ${getRarityColor(item.rarity)}`,
            }}
          >
            <Ambient rarity={item.rarity}>
              <img
                src={item.img}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Ambient>

            <Box
              sx={{
                position: "absolute",
                left: "50%",
                bottom: "6px",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(60, 60, 60, 0.5)",
                  borderRadius: "40px",
                  padding: "6px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography
                  sx={{
                    color: colors.textColor,
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Box>
          </NavLink>
        ))
      ) : (
        <Typography sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Кейсы не найдены
        </Typography>
      )}
    </Box>
  );
};
