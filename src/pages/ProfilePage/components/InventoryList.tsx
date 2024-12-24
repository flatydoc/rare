import { Box, Rating, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { NavLink } from "react-router-dom";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { RouteList } from "../../../core/enums";
import { IInventoryItem } from "../../../core/types";
import { Ambient } from "../../../components/ui/Ambient";
import { elementEmojis, fractionEmojis } from "../../SingleCardPage/constants";
import { colors } from "../../../core/theme/colors";
import { getIconByCardClass } from "../../../core/utils/geIconByCardClass";

export const InventoryList = ({ items }: { items: IInventoryItem[] }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        width: "100%",
      }}
    >
      {items.length > 0 ? (
        items.map((item) => {
          const route =
            item.type === "case"
              ? `/${RouteList.Shop}/${item.id}`
              : `/${RouteList.Cards}/${item.id}`;
          return (
            <NavLink
              to={route}
              key={item.id}
              style={{
                ...centerContentStyles,
                overflow: "hidden",
                flexDirection: "column",
                width: "100%",
                maxWidth: "300px",
                borderRadius: "20px",
                position: "relative",
                padding: "10px",
                aspectRatio: "1",
                boxShadow:
                  item.type === "case"
                    ? "none"
                    : `0 1px 2px 0 inset ${getRarityColor(item.rarity)}`,
              }}
            >
              {item.type === "case" ? (
                <img
                  src={item.img}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
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
              )}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: "12px",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {item.type === "card" && item.stars !== undefined && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Rating
                      size="small"
                      value={item.stars}
                      readOnly
                      sx={{
                        "& .MuiRating-iconEmpty": {
                          color: "#fff",
                        },
                      }}
                    />
                  </Box>
                )}
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
              {item.type === "card" && item.fraction && (
                <Typography
                  sx={{
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                    fontSize: "16px",
                  }}
                >
                  {fractionEmojis[item.fraction]}
                </Typography>
              )}
              {item.type === "card" && item.element && (
                <Typography
                  sx={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    fontSize: "16px",
                  }}
                >
                  {elementEmojis[item.element]}
                </Typography>
              )}
              {item.type === "card" && item.class && (
                <img
                  style={{
                    position: "absolute",
                    left: "12px",
                    bottom: "12px",
                  }}
                  width={24}
                  height={24}
                  src={getIconByCardClass(item.class)}
                />
              )}
              {item.type === "card" && item.level && (
                <Box
                  sx={{
                    position: "absolute",
                    right: "12px",
                    bottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    backgroundColor: "rgba(60, 60, 60, 0.5)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.level}
                  </Typography>
                </Box>
              )}
            </NavLink>
          );
        })
      ) : (
        <Typography sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Предметы не найдены
        </Typography>
      )}
    </Box>
  );
};
