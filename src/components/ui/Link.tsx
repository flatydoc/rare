import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useHapticFeedback } from "@telegram-apps/sdk-react";

export const Link = ({
  to,
  label,
  img,
}: {
  to: string;
  label: string;
  img: string;
}) => {
  const hapticFeedback = useHapticFeedback();

  const handleClick = () => {
    hapticFeedback.impactOccurred("light");
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        height: "100%",
        width: "62px",
        minWidth: "62px",
        flexGrow: "1",
        backgroundColor: isActive ? "#fff" : "transparent",
        borderRadius: "17px",
        boxShadow: isActive ? "0px 1px 1px 0px #739BBF40" : "none",
        color: isActive ? "yellow" : "red",
        transition: "all ease 0.2s",
      })}
    >
      <img src={img} width={24} height={24} alt={label} />
      <Typography
        sx={{
          fontSize: "12px",
        }}
      >
        {label}
      </Typography>
    </NavLink>
  );
};
