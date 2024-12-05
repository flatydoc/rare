import { Box } from "@mui/material";
import { navLinks } from "./constants";
import { Link } from "../ui/Link";

export const Navigation = () => {
  const links = navLinks.map(({ to, label, img }) => (
    <Link key={to} to={to} label={label} img={img} />
  ));

  return (
    <Box
      sx={{
        borderRadius: "20px",
        background: "#eff3f6",
        backdropFilter: "blur(7px)",
        boxShadow: "0px 50px 50px 20px rgba(255, 255, 255, 0.8)",
        border: "1px #F9FAFB",
        position: "relative",
      }}
    >
      <Box
        component={"nav"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
          minWidth: "fit-content",
          padding: "3px",
        }}
      >
        {links}
      </Box>
    </Box>
  );
};
