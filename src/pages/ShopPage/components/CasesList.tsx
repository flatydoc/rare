import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { ICase } from "../../../core/types";
import { NavLink } from "react-router-dom";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { RouteList } from "../../../core/enums";

export const CasesList = ({ cases }: { cases: ICase[] }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
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
              maxWidth: "300px",
              padding: "12px 8px",
              border: `2px solid ${getRarityColor(item.rarity)}`,
              borderRadius: "20px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                ...centerContentStyles,
                gap: "10px",
              }}
            >
              <Typography>{`${item.price}$`}</Typography>
            </Box>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {item.name}
            </Typography>
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
