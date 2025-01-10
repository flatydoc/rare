import { Box } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import AddIcon from "@mui/icons-material/Add";
import { colors } from "../../../core/theme/colors";

export const EmptyCardSlot = ({
  onClick,
  index,
}: {
  onClick?: (index: number) => void;
  index: number;
}) => {
  const handelClick = () => {
    if (onClick) {
      onClick(index);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "20px",
        boxShadow: "none",
        backgroundColor: "rgba(60, 60, 60, 0.5)",
      }}
      onClick={handelClick}
    >
      <Box
        sx={{
          ...centerContentStyles,
          overflow: "hidden",
          width: "100%",
          maxWidth: "240px",
          borderRadius: "20px",
          padding: "10px",
          aspectRatio: "1",
          boxShadow: `0 1px 2px 0 inset #d3d3d3`,
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            ...centerContentStyles,
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "rgba(60, 60, 60, 0.7)",
            border: `1px dashed ${colors.secondaryTextColor}`,
            cursor: "pointer",
          }}
        >
          <AddIcon
            sx={{
              width: "64px",
              height: "64px",
              color: colors.textColor,
              opacity: 0.4,
              transition: "opacity 0.3s ease-in-out",
              "&:hover": {
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "12px 6px",
          gap: "12px",
          height: "94px",
        }}
      />
    </Box>
  );
};
