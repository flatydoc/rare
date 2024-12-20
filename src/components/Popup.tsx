import { Box, SwipeableDrawer } from "@mui/material";

export const Popup = ({
  isShow,
  setIsShow,
  children,
}: {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  children: React.ReactNode;
}) => {
  const DRAWER_BLEEDING = 26;

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
          minHeight: `calc(50% - ${DRAWER_BLEEDING}px)`,
          overflow: "visible",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
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
          paddingTop: "12px",
          "&:hover .drawer": {
            backgroundColor: "#ffffffaa",
          },
        }}
      >
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
      </Box>
      <Box
        sx={{
          height: "100%",
          padding: "26px 16px 54px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {children}
      </Box>
    </SwipeableDrawer>
  );
};
