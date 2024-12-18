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
      <Navigation />
    </>
  );
};
