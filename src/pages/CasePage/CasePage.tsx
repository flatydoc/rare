import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { CaseDetails } from "./components/CaseDetails";
import { cases } from "../ShopPage/constants";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { cards } from "../CardsPage/constants";
import { ICard } from "../../core/types";
import { Roulette } from "./components/Roulette/Roulette";
import { CardsList } from "./components/CardsList";

export const CasePage = () => {
  const { caseId } = useParams();
  useBackBtn();

  const selectedCase = cases.find(
    (caseItem) => caseItem.id === parseInt(caseId ?? "")
  );

  if (!selectedCase) {
    return <Typography>Кейс не найден</Typography>;
  }

  const caseCards = selectedCase.cardIds
    .map((cardId) => cards.find((card) => card.id === cardId))
    .filter((card): card is ICard => card !== undefined);

  return (
    <Box>
      <Roulette caseCards={caseCards} />
      <CaseDetails selectedCase={selectedCase} />
      <CardsList caseCards={caseCards} />
    </Box>
  );
};
