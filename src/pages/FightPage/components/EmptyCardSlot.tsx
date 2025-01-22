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
      }}
      onClick={handelClick}
    >
      <Box
        sx={{
          ...centerContentStyles,
          width: "100%",
          aspectRatio: "1",
          maxWidth: "240px",
        }}
      >
        <Box
          sx={{
            ...centerContentStyles,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(60, 60, 60, 0.7)",
            border: `1px dashed ${colors.secondaryTextColor}`,
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: "-1",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "50%",
              height: "10%",
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              filter: "blur(12px)",
              boxShadow: `0px 0px 20px ${"rgba(255, 255, 255, 0.5)"}`,
            }}
          />
          <AddIcon
            sx={{
              width: "32px",
              height: "32px",
              color: colors.textColor,
              opacity: 0.4,
              transition: "opacity 0.2s ease-in-out",
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
          height: "92px",
        }}
      />
    </Box>
  );
};
