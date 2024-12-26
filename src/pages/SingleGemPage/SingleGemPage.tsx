import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { GemInfo } from "./components/GemInfo";

export const SingleGemPage = () => {
  useBackBtn();
  const { gemId } = useParams<{ gemId: string }>();
  if (!gemId) return null;

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "100%",
          p: "24px 16px 104px 16px",
          overflowY: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "32px",
          alignItems: "center",
        }}
      >
        <GemInfo gemId={+gemId} />
      </Box>
    </Box>
  );
};
