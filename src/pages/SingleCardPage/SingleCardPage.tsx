import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export const SingleCardPage = () => {
  const { cardId } = useParams();

  return <Box>card: {cardId}</Box>;
};
