import { Box } from "@mui/material";
import { useCardStore } from "../../core/store/useCardStore";
import { CardsList } from "./components/CardsList";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../core/enums";

export const CardsPage = () => {
  const cards = useCardStore((state) => state.cards);
  const navigate = useNavigate();

  const handleNav = (id: number) => {
    navigate(`/${RouteList.Cards}/${id}`);
  };

  return (
    <Box>
      <CardsList event={handleNav} cards={cards} />
    </Box>
  );
};
