import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { cards } from "../CardsPage/constants";

export const SingleCardPage = () => {
  const { cardId } = useParams<{ cardId: string }>();
  useBackBtn();

  const card = cards.find((c) => c.id === Number(cardId));

  return (
    <Box>
      {card ? (
        <Typography variant="h4">{card.name}</Typography>
      ) : (
        <Typography variant="h6">Card not found</Typography>
      )}
    </Box>
  );
};
