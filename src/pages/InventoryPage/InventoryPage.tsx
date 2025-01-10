import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../core/enums";
import { useGemStore } from "../../core/store/useGemStore";
import { GemsList } from "./components/GemsList";

export const InventoryPage = () => {
  const gems = useGemStore((state) => state.gems);
  const navigate = useNavigate();

  const handleNav = (id: number) => {
    navigate(`/${RouteList.Gems}/${id}`);
  };

  return (
    <Box>
      <GemsList event={handleNav} gems={gems} />
    </Box>
  );
};
