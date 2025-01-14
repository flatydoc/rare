import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../core/theme/common.style";
import { ICard } from "../../core/types";
import { FightCardsList } from "./components/FightCardsList";
import { useEffect, useState } from "react";
import { Popup } from "../../components/Popup";
import { SelectCardPopup } from "./components/SelectCardPopup";
import { useCardStore } from "../../core/store/useCardStore";
import { MainButton } from "../../components/MainButton";
import { colors } from "../../core/theme/colors";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { getRandomDamage } from "../../core/utils/getRandomDamage";
import { useEnemyAttack } from "../../core/hooks/useEnemyAttack";
import { animateAttack } from "../../core/utils/animateAttack";
import { useParams } from "react-router-dom";
import { PVERounds } from "../HomePage/constants";

export const FightPage = () => {
  useBackBtn();
  const { fightId } = useParams<{ fightId: string }>();
  const [enemyCards, setEnemyCards] = useState<ICard[]>([]);

  useEffect(() => {
    if (fightId) {
      const round = PVERounds.find(
        (round) => round.id === parseInt(fightId, 10)
      );
      if (round) {
        setEnemyCards(round.enemyCards);
      } else {
        console.error(`Round with id ${fightId} not found`);
      }
    }
  }, [fightId]);

  const cards = useCardStore((state) => state.cards);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [myCards, setMyCards] = useState<ICard[] | number[]>([1, 2, 3]);
  const [isOpenSelectCardPopup, setIsOpenSelectCardPopup] = useState(false);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean | null>(false);
  const [reloadableCards, setReloadableCards] = useState<number[]>([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null
  );
  const [selectedEnemyCardId, setSelectedEnemyCardId] = useState<number | null>(
    null
  );
  const [selectedMyCardId, setSelectedMyCardId] = useState<number | null>(null);
  const [damageInfo, setDamageInfo] = useState<{
    id: number;
    damage: number;
  } | null>(null);

  const [selectedCardIdForInsert, setSelectedCardIdForInsert] = useState<
    number | null
  >(null);
  const [isFight, setIsFight] = useState(false);

  const handleFight = () => {
    if (areAllCardsValid()) {
      setIsFight(true);
    }
  };

  const areAllCardsValid = () => {
    return (
      myCards.length === 3 &&
      myCards.every((card) => typeof card === "object" && "id" in card)
    );
  };

  const isFightAvailable = areAllCardsValid();
  const isAttackAvailable =
    selectedEnemyCardId !== null && selectedMyCardId !== null;

  const handleEmptySlotClick = (index: number) => {
    setSelectedSlotIndex(index);
    setIsOpenSelectCardPopup(true);
  };

  const handleSelectEnemyCardId = (id: number) => {
    if (!isFightAvailable || !isFight || !isPlayerTurn) return null;
    setSelectedEnemyCardId(id);
  };

  const handleSelectMyCardId = (id: number) => {
    if (!isFightAvailable || !isFight || !isPlayerTurn) return null;
    setSelectedMyCardId(id);
  };

  const handleSelectCardForInsert = (id: number) => {
    setSelectedCardIdForInsert(id);
  };

  const handleInsertCard = () => {
    if (selectedSlotIndex !== null && selectedCardIdForInsert !== null) {
      const selectedCard = cards.find(
        (card) => card.id === selectedCardIdForInsert
      );
      if (selectedCard) {
        const newMyCards = [...myCards];
        newMyCards[selectedSlotIndex] = selectedCard;
        setMyCards(newMyCards as ICard[]);
        setIsOpenSelectCardPopup(false);
        setSelectedSlotIndex(null);
        setSelectedCardIdForInsert(null);
      }
    }
  };

  const handleAttack = () => {
    if (
      isPlayerTurn &&
      isAttackAvailable &&
      selectedMyCardId !== null &&
      selectedEnemyCardId !== null
    ) {
      const myCard = myCards.find(
        (card) => typeof card !== "number" && card.id === selectedMyCardId
      ) as ICard;

      const attackingCardElement = document.getElementById(
        `card-${selectedMyCardId}`
      );
      const targetCardElement = document.getElementById(
        `card-${selectedEnemyCardId}`
      );

      if (attackingCardElement && targetCardElement) {
        animateAttack(attackingCardElement, targetCardElement, () => {
          const updatedEnemyCards = enemyCards.map((card) => {
            if (card.id === selectedEnemyCardId) {
              const damage = getRandomDamage(myCard.damage);
              const newHealth = Math.max(0, card.fightHealth - damage);
              setDamageInfo({ id: selectedEnemyCardId, damage });
              return { ...card, fightHealth: newHealth };
            }
            return card;
          });

          setEnemyCards(updatedEnemyCards);
          setTimeout(() => setDamageInfo(null), 1000);
          setReloadableCards((prev) => [...prev, selectedMyCardId]);
          setSelectedEnemyCardId(null);
          setSelectedMyCardId(null);

          // Если все карты атаковали, передаем ход противнику
          const aliveMyCards = myCards.filter(
            (card) => typeof card !== "number" && card.fightHealth > 0
          );

          if (reloadableCards.length + 1 === aliveMyCards.length) {
            setIsPlayerTurn(false);
            setReloadableCards([]);
          }
        });
      }
    }
  };

  const cardsForInsert = cards.filter(
    (card) =>
      !myCards.some(
        (myCard) => typeof myCard !== "number" && myCard.id === card.id
      )
  );

  useEnemyAttack(
    enemyCards,
    setMyCards,
    reloadableCards,
    setReloadableCards,
    isFight,
    isPlayerTurn,
    setIsPlayerTurn,
    setDamageInfo
  );

  // useEffect(() => {
  //   const allEnemyCardsDead = enemyCards.every(
  //     (card) => card.fightHealth === 0
  //   );
  //   const allMyCardsDead = myCards.every(
  //     (card) => typeof card !== "number" && card.fightHealth === 0
  //   );

  //   if (allEnemyCardsDead) {
  //     setIsShowResult(true);
  //     setIsWin(true);
  //   } else if (allMyCardsDead) {
  //     setIsShowResult(true);
  //     setIsWin(false);
  //   }
  // }, [enemyCards, myCards]);

  return (
    <Box
      sx={{
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {isShowResult && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: isWin === true ? "green" : "red",
            zIndex: "100",
          }}
        >
          {isWin === true ? (
            <Typography>Win</Typography>
          ) : (
            <Typography>Loss</Typography>
          )}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          width: "100%",
          p: "24px 12px 24px 12px",
        }}
      >
        <FightCardsList
          reloadableCards={reloadableCards}
          selectedCardId={selectedEnemyCardId}
          event={handleSelectEnemyCardId}
          cards={enemyCards}
          damageInfo={damageInfo}
        />
      </Box>
      <Box
        sx={{
          minHeight: "50%",
          width: "100%",
          backgroundColor: "rgba(60, 60, 60, 0.5)",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          p: "64px 12px 24px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            ...centerContentStyles,
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgb(60, 60, 60)",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
            }}
          >
            ⚔️
          </Typography>
        </Box>
        <FightCardsList
          reloadableCards={reloadableCards}
          isMyCardList
          selectedCardId={selectedMyCardId}
          event={handleSelectMyCardId}
          cards={myCards}
          onEmptySlotClick={handleEmptySlotClick}
          damageInfo={damageInfo}
        />
        {isFight ? (
          <MainButton
            onClick={handleAttack}
            disabled={
              !isAttackAvailable ||
              reloadableCards.includes(selectedMyCardId ?? -1)
            }
            fullWidth
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color:
                  !isAttackAvailable ||
                  reloadableCards.includes(selectedMyCardId ?? -1)
                    ? colors.secondaryTextColor
                    : "#000",
              }}
            >
              {"ATTACK"}
            </Typography>
          </MainButton>
        ) : (
          <MainButton
            onClick={handleFight}
            disabled={!isFightAvailable}
            fullWidth
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: isFightAvailable ? "#000" : colors.secondaryTextColor,
              }}
            >
              {isFightAvailable ? "FIGHT" : "SELECT CARDS"}
            </Typography>
          </MainButton>
        )}
      </Box>
      <Popup
        isShow={isOpenSelectCardPopup}
        setIsShow={setIsOpenSelectCardPopup}
      >
        <SelectCardPopup
          handleInsertCard={handleInsertCard}
          cards={cardsForInsert}
          handleSelectCardForInsert={handleSelectCardForInsert}
          selectedCardIdForInsert={selectedCardIdForInsert}
        />
      </Popup>
    </Box>
  );
};
