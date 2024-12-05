import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { Navigation } from "./components/Navigation/Navigation";

export const Layout = () => {
  return (
    <>
      <Box
        component={"main"}
        sx={{
          position: "relative",
          height: `100vh`,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
      <Box
        component={"footer"}
        sx={{
          position: "fixed",
          bottom: "26px",
          left: "12px",
          zIndex: "999",
          width: "calc(100% - 24px)",
          padding: "1px",
          borderRadius: "21px",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(200,200,200,1) 100%)",
        }}
      >
        <Navigation />
      </Box>
    </>
  );
};
