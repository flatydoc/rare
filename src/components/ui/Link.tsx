import { NavLink, useMatch } from "react-router-dom";
import { Typography } from "@mui/material";
import { colors } from "../../core/theme/colors";

export const Link = ({
  to,
  label,
  img,
}: {
  to: string;
  label: string;
  img: string;
}) => {
  const match = useMatch({
    path: `${to}/*`,
    end: false,
  });

  return (
    <NavLink
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        height: "100%",
        width: "62px",
        minWidth: "62px",
        flexGrow: "1",
        backgroundColor: match ? "rgb(35, 35, 35)" : "transparent",
        borderRadius: "17px",
        border: match ? "1px solid rgb(15, 15, 15)" : "none",
        boxShadow: match
          ? `0px 1px 1px 0px inset rgba(250, 129, 9, 0.1)`
          : "none",
      }}
    >
      <img src={img} width={24} height={24} alt={label} />
      <Typography
        sx={{
          color: match ? colors.primary : colors.secondaryTextColor,
          fontSize: "12px",
          transition: "all ease 0.2s",
        }}
      >
        {label}
      </Typography>
    </NavLink>
  );
};
