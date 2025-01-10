import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { Player } from "@lottiefiles/react-lottie-player";
import { useAllCardsStore } from "../../core/store/useAllCardsStore";
import { CaseDetails } from "./components/CaseDetails";
import { CaseCardsList } from "./components/CaseCardsList";
import { ICard, ICardPrototype } from "../../core/types";
import { useCaseStore } from "../../core/store/useCaseStore";
import { useState } from "react";
import { MainButton } from "../../components/MainButton";
import animation from "../../assets/animations/gradient.json";
import { useCardStore } from "../../core/store/useCardStore";
import { SingleCard } from "../CardsPage/components/SingleCard";

export const SingleCasePage = () => {
  useBackBtn();
  const { caseId } = useParams();
  if (!caseId) return null;

  const allCards = useAllCardsStore((state) => state.cards);
  const selectedCase = useCaseStore((state) => state.getCaseById(+caseId));
  const generateNewCard = useCardStore((state) => state.generateNewCard);
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);
  const [isShowWinCard, setIsShowWinCard] = useState(false);
  const [isSkipAnimation, setIsSkipAnimation] = useState(false);

  const [winCard, setWinCard] = useState<ICard | null>(null);

  if (!selectedCase) return null;

  const caseCards = selectedCase.cardIds
    .map((cardId) => allCards.find((card) => card.id === cardId))
    .filter((card): card is ICardPrototype => card !== undefined);

  const handleAnimation = () => {
    setIsOpeningAnimation(true);
    setIsShowWinCard(false);
    setIsSkipAnimation(false);

    const rarityWeights: Record<string, number> = {
      common: 50,
      uncommon: 40,
      rare: 10,
    };

    const getRandomCardWithWeights = (cards: ICardPrototype[]) => {
      const weightedCards: { card: ICardPrototype; weight: number }[] =
        cards.map((card) => ({
          card,
          weight: rarityWeights[card.rarity] || 0,
        }));

      const totalWeight = weightedCards.reduce(
        (sum, { weight }) => sum + weight,
        0
      );
      const randomValue = Math.random() * totalWeight;

      let cumulativeWeight = 0;
      for (const { card, weight } of weightedCards) {
        cumulativeWeight += weight;
        if (randomValue <= cumulativeWeight) {
          return card;
        }
      }
      return cards[0];
    };

    const randomCardPrototype = getRandomCardWithWeights(caseCards);
    const newCard = generateNewCard(randomCardPrototype);

    setTimeout(() => {
      if (!isSkipAnimation) {
        setIsOpeningAnimation(false);
        setWinCard(newCard);
        setIsShowWinCard(true);

        setTimeout(() => {
          setIsShowWinCard(false);
        }, 2000);
      } else {
        setIsOpeningAnimation(false);
        setWinCard(newCard);
        setIsShowWinCard(true);
      }
    }, 3000);
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", p: "12px 0 104px 0" }}>
      {isOpeningAnimation && !isSkipAnimation && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            zIndex: "101",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: `blur(8px)`,
            backgroundColor: "rgba(25, 25, 25, 0.5)",
          }}
        >
          <Player
            style={{
              width: "100%",
              height: "100%",
            }}
            src={animation}
            loop
            autoplay
          />
        </Box>
      )}

      <CaseDetails selectedCase={selectedCase} />
      <CaseCardsList caseCards={caseCards} />
      <MainButton fullWidth onClick={handleAnimation}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            textTransform: "uppercase",
            color: "#000",
          }}
        >
          {`Spin`}
        </Typography>
      </MainButton>

      {winCard && isShowWinCard && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            zIndex: "101",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: `blur(8px)`,
            backgroundColor: "rgba(25, 25, 25, 0.5)",
          }}
        >
          <SingleCard card={winCard} />
        </Box>
      )}
    </Box>
  );
};
