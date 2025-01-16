import { Box } from "@mui/material";
import { centerContentStyles } from "../../core/theme/common.style";

export const Modal = ({
  title,
  text,
  icon,
  isOpen,
  setIsOpen,
}: {
  title?: string;
  text: string;
  icon?: string;
  isOpen?: boolean;
  setIsOpen?: (a: boolean) => void;
}) => {
  console.log(title, icon, isOpen, setIsOpen);
  return (
    <Box
      sx={{
        ...centerContentStyles,
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "100",
        width: "100vw",
        height: "100vh",
        backdropFilter: `blur(8px)`,
        backgroundColor: "rgba(25, 25, 25, 0.5)",
      }}
    >
      <Box sx={{}}>{text}</Box>
    </Box>
  );
};
