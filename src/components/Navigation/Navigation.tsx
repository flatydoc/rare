import { Box } from "@mui/material";
import { navLinks } from "./constants";
import { Link } from "../ui/Link";
import { colors } from "../../core/theme/colors";

export const Navigation = () => {
  const links = navLinks.map(({ to, label, img }) => (
    <Link key={to} to={to} label={label} img={img} />
  ));

  return (
    <Box
      component={"footer"}
      sx={{
        position: "fixed",
        bottom: "26px",
        left: "12px",
        zIndex: "100",
        width: "calc(100% - 24px)",
        padding: "1px",
        borderRadius: "21px",
        background: `linear-gradient(0deg, #000 0%, rgba(250, 129, 9, 0.3) 100%)`,
      }}
    >
      <Box
        sx={{
          borderRadius: "20px",
          background: colors.secondaryBackground,
          backdropFilter: "blur(7px)",
          boxShadow: `0px 50px 50px 20px ${colors.background}`,
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
    </Box>
  );
};
