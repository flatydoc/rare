import { Box } from "@mui/material";
import { LevelProgressBar } from "./LevelProgressBar";
import { UserStats } from "./UserStats";
import { IUser } from "../../../core/types";

export const Header = ({ user }: { user: IUser }) => {
  return (
    <Box
      sx={{
        p: "24px 12px 12px 12px",
      }}
    >
      <LevelProgressBar level={user.level} exp={user.exp} />
      <UserStats energy={user.energy} balance={user.balance} />
    </Box>
  );
};
