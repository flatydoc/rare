import { Box, MenuItem, Select, Typography } from "@mui/material";
import { CardClass, Element, Fraction } from "../../../core/types";
import { colors } from "../../../core/theme/colors";
import { centerContentStyles } from "../../../core/theme/common.style";
import { elementEmojis, fractionEmojis } from "../../SingleCardPage/constants";
import { getElementColor } from "../../../core/utils/getElementColor";
import { ICONS_BY_CARD_CLASS } from "../../../core/utils/geIconByCardClass";

interface SortPopupProps {
  sortKey: string;
  setSortKey: (key: string) => void;
  filters: {
    class: string;
    fraction: string;
    element: string;
  };
  setFilters: (filters: {
    class: string;
    fraction: string;
    element: string;
  }) => void;
}

export const SortPopup: React.FC<SortPopupProps> = ({
  sortKey,
  setSortKey,
  filters,
  setFilters,
}) => {
  return (
    <Box
      sx={{
        ...centerContentStyles,
        flexDirection: "column",
        gap: "36px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          ...centerContentStyles,
          flexDirection: "column",
          width: "100%",
          gap: "24px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: colors.textColor,
          }}
        >
          Sort By
        </Typography>
        <Select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          fullWidth
          sx={{
            color: colors.textColor,
            "& .MuiOutlinedInput-input": { minHeight: "0 !important" },
            "& .MuiSelect-icon": { color: colors.secondaryTextColor },
          }}
          MenuProps={{
            PaperProps: { sx: { backgroundColor: "rgba(35, 35, 35)" } },
          }}
        >
          {["totalPower", "rarity", "tier", "level", "stars"].map((key) => (
            <MenuItem key={key} value={key} sx={{ minHeight: "36px" }}>
              <Typography
                sx={{
                  color: colors.textColor,
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box
        sx={{
          ...centerContentStyles,
          flexDirection: "column",
          width: "100%",
          gap: "24px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: colors.textColor,
          }}
        >
          Filters
        </Typography>
        <Box
          sx={{
            ...centerContentStyles,
            flexDirection: "column",
            width: "100%",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: colors.secondaryTextColor,
              textAlign: "left",
              width: "100%",
              ml: "24px",
            }}
          >
            Class
          </Typography>
          <Select
            value={filters.class}
            onChange={(e) =>
              setFilters({ ...filters, class: e.target.value as CardClass })
            }
            fullWidth
            displayEmpty
            sx={{
              color: colors.textColor,
              "& .MuiOutlinedInput-input": {
                minHeight: "0 !important",
              },
              "& .MuiSelect-icon": {
                color: colors.secondaryTextColor,
              },
            }}
            MenuProps={{
              PaperProps: { sx: { backgroundColor: "rgba(35, 35, 35)" } },
            }}
          >
            <MenuItem value="">
              <Typography
                sx={{
                  color: colors.textColor,
                }}
              >
                All
              </Typography>
            </MenuItem>
            {Object.entries(ICONS_BY_CARD_CLASS).map(([key, icon]) => (
              <MenuItem key={key} value={key} sx={{ minHeight: "36px" }}>
                <Box display="flex" alignItems="center" gap="10px">
                  <img src={icon} alt={key} width={16} height={16} />
                  <Typography
                    sx={{
                      color: colors.textColor,
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            ...centerContentStyles,
            flexDirection: "column",
            width: "100%",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: colors.secondaryTextColor,
              textAlign: "left",
              width: "100%",
              ml: "24px",
            }}
          >
            Fraction
          </Typography>
          <Select
            value={filters.fraction}
            onChange={(e) =>
              setFilters({ ...filters, fraction: e.target.value as Fraction })
            }
            fullWidth
            displayEmpty
            sx={{
              color: colors.textColor,
              "& .MuiOutlinedInput-input": {
                minHeight: "0 !important",
              },
              "& .MuiSelect-icon": {
                color: colors.secondaryTextColor,
              },
            }}
            MenuProps={{
              PaperProps: { sx: { backgroundColor: "rgba(35, 35, 35)" } },
            }}
          >
            <MenuItem value="">
              <Typography
                sx={{
                  color: colors.textColor,
                }}
              >
                All
              </Typography>
            </MenuItem>
            {Object.entries(fractionEmojis).map(([key, emoji]) => (
              <MenuItem key={key} value={key} sx={{ minHeight: "36px" }}>
                <Typography
                  sx={{
                    color: colors.textColor,
                  }}
                >{`${emoji} ${
                  key.charAt(0).toUpperCase() + key.slice(1)
                }`}</Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            ...centerContentStyles,
            flexDirection: "column",
            width: "100%",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: colors.secondaryTextColor,
              textAlign: "left",
              width: "100%",
              ml: "24px",
            }}
          >
            Damage Type
          </Typography>
          <Select
            value={filters.element}
            onChange={(e) =>
              setFilters({ ...filters, element: e.target.value as Element })
            }
            fullWidth
            displayEmpty
            sx={{
              color: colors.textColor,
              "& .MuiOutlinedInput-input": {
                minHeight: "0 !important",
              },
              "& .MuiSelect-icon": {
                color: colors.secondaryTextColor,
              },
            }}
            MenuProps={{
              PaperProps: { sx: { backgroundColor: "rgba(35, 35, 35)" } },
            }}
          >
            <MenuItem value="">
              <Typography
                sx={{
                  color: colors.textColor,
                }}
              >
                All
              </Typography>
            </MenuItem>
            {Object.entries(elementEmojis).map(([key, emoji]) => (
              <MenuItem key={key} value={key} sx={{ minHeight: "36px" }}>
                <Typography
                  sx={{
                    color: getElementColor(key as Element),
                  }}
                >
                  {`${emoji} ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
};
