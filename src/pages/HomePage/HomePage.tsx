import { Box } from "@mui/material";
import { UsernameDisplay } from "./components/UsernameDisplay";
import { EnergyDisplay } from "./components/EnergyDisplay";
import { UpdateEnergyButton } from "./components/UpdateEnergyButton";

export const HomePage = () => {
  return (
    <Box>
      <UsernameDisplay />
      <EnergyDisplay />
      <UpdateEnergyButton />
    </Box>
  );
};
