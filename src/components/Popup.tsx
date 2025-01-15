import { Box, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import { colors } from "../core/theme/colors";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const Popup = ({
  isShow,
  setIsShow,
  children,
  eventOnBack,
  eventOnClose,
  title,
}: {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  children: React.ReactNode;
  eventOnBack?: () => void;
  eventOnClose?: () => void;
  title?: string;
}) => {
  const DRAWER_BLEEDING = 26;

  const handleBack = () => {
    if (eventOnBack) eventOnBack();
  };

  const handleClose = () => {
    if (eventOnClose) eventOnClose();
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsShow(newOpen);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isShow}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={DRAWER_BLEEDING}
      disableSwipeToOpen={true}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          overflow: "visible",
          borderTopLeftRadius: !title ? 20 : 0,
          borderTopRightRadius: !title ? 20 : 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(35, 35, 35)",
        },
        "& .MuiBackdrop-root": {
          backdropFilter: `blur(8px)`,
          backgroundColor: "rgba(25, 25, 25, 0.5)",
        },
      }}
    >
      <Box
        sx={{
          height: `${DRAWER_BLEEDING}px`,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          color: colors.textColor,
          paddingTop: "12px",
          "&:hover .drawer": {
            backgroundColor: "#ffffffaa",
          },
        }}
      >
        {!title && (
          <Box
            className="drawer"
            sx={{
              width: 120,
              height: 4,
              backgroundColor: "#FFFFFF1A",
              borderRadius: 3,
              transition: "background-color 0.3s ease",
            }}
          />
        )}
      </Box>
      {title && (
        <Box
          sx={{
            p: "0 16px 18px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              color: colors.textColor,
            }}
          >
            {title}
          </Typography>
          {eventOnClose && (
            <Box onClick={handleClose}>
              <IconButton
                sx={{
                  color: colors.secondaryTextColor,
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      )}

      <Box
        sx={{
          height: "100%",
          padding: "26px 16px 54px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          position: "relative",
          overflowY: "auto",
        }}
      >
        {eventOnBack && (
          <Box
            sx={{ position: "absolute", top: "0", left: "16px" }}
            onClick={handleBack}
          >
            <IconButton
              sx={{
                color: colors.secondaryTextColor,
              }}
            >
              <NavigateBeforeOutlinedIcon />
            </IconButton>
          </Box>
        )}

        {children}
      </Box>
    </SwipeableDrawer>
  );
};
