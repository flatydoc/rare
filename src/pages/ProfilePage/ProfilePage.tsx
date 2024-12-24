import { Box } from "@mui/material";
import { useUserStore } from "../../core/store/useUserStore";
import { Header } from "./components/Header";

export const ProfilePage = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        p: "12px 16px 104px 16px",
      }}
    >
      <Header user={user} />
      <Box>ProfilePage</Box>
    </Box>
  );
};
