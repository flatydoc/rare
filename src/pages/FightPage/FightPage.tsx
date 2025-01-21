import { Box, Typography } from "@mui/material";
import { IFightCard } from "../../core/types";
import { FightCardsList } from "./components/FightCardsList";
import { useEffect, useMemo, useState } from "react";
import { Popup } from "../../components/Popup";
import { SelectCardPopup } from "./components/SelectCardPopup";
import { useCardStore } from "../../core/store/useCardStore";
import { MainButton } from "../../components/MainButton";
import { colors } from "../../core/theme/colors";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { useEnemyAttack } from "../../core/hooks/useEnemyAttack";
import { useNavigate, useParams } from "react-router-dom";
import { PVERounds } from "../HomePage/constants";
import { useUserStore } from "../../core/store/useUserStore";
import { centerContentStyles } from "../../core/theme/common.style";
import { RouteList } from "../../core/enums";
import { generateDefaultStatusEffects } from "./utils/generateDefaultStatusEffects";
import { updateCardState } from "./utils/updateCardState";
import { applySleepEffectToCard } from "./utils/applySleepEffectToCard";
import { checkVictoryCondition } from "./utils/checkVictoryCondition";
import { removeSleepEffectsFromCards } from "./utils/removeSleepEffectsFromCards";
import { restoreCardHealth } from "./utils/restoreCardHealth";
import { animateAttack } from "../../core/utils/animateAttack";
import { StatusEffectId } from "../../core/enums/statusEffects";
import { removeExpiredEffects } from "./utils/removeExpiredEffects";

export const FightPage = () => {
  useBackBtn();
  const { fightId } = useParams<{ fightId: string }>();
  const [enemyCards, setEnemyCards] = useState<IFightCard[]>([]);

  useEffect(() => {
    if (fightId) {
      const round = PVERounds.find(
        (round) => round.id === parseInt(fightId, 10)
      );
      if (round) {
        const enhancedCards = round.enemyCards.map((card) => ({
          ...card,
          fightHealth: card.health + card.bonusHealth,
          fightArmor: card.armor + card.bonusArmor,
          fightDamage: card.damage + card.bonusDamage,
          statusEffects: generateDefaultStatusEffects(
            card.fraction,
            card.element
          ),
        }));
        setEnemyCards(enhancedCards);
      } else {
        console.error(`Round with id ${fightId} not found`);
      }
    }
  }, []);

  const navigate = useNavigate();
  const cards = useCardStore((state) => state.cards);
  const [reward, setReward] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [myCards, setMyCards] = useState<IFightCard[] | number[]>([1, 2, 3]);
  const [isOpenSelectCardPopup, setIsOpenSelectCardPopup] = useState(false);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean | null>(false);
  const [reloadableCards, setReloadableCards] = useState<number[]>([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null
  );
  const [round, setRound] = useState<number>(1);
  const [selectedEnemyCardId, setSelectedEnemyCardId] = useState<number | null>(
    null
  );
  const [selectedMyCardId, setSelectedMyCardId] = useState<number | null>(null);
  const [damageInfo, setDamageInfo] = useState<{
    id: number;
    damage: number;
    isCrit?: boolean;
    isMiss?: boolean;
  } | null>(null);

  const [healInfo, setHealInfo] = useState<{
    id: number;
    heal: number;
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
    if (!isFightAvailable || !isFight || !isPlayerTurn) return;
    setSelectedEnemyCardId((prev) => (prev === id ? null : id));
  };

  const handleSelectMyCardId = (id: number) => {
    if (!isFightAvailable || !isFight || !isPlayerTurn) return;
    setSelectedMyCardId((prev) => (prev === id ? null : id));
  };

  const handleSelectCardForInsert = (id: number) => {
    setSelectedCardIdForInsert(id);
  };

  const handleReturnToHomePage = () => {
    navigate(`${RouteList.Root}`);
  };

  const handleInsertCard = () => {
    if (selectedSlotIndex !== null && selectedCardIdForInsert !== null) {
      const selectedCard = cards.find(
        (card) => card.id === selectedCardIdForInsert
      );
      if (selectedCard) {
        const newMyCards = [...myCards];
        newMyCards[selectedSlotIndex] = {
          ...selectedCard,
          fightHealth: selectedCard.health + selectedCard.bonusHealth,
          fightArmor: selectedCard.armor + selectedCard.bonusArmor,
          fightDamage: selectedCard.damage + selectedCard.bonusDamage,
          statusEffects: generateDefaultStatusEffects(
            selectedCard.fraction,
            selectedCard.element
          ),
        };
        setMyCards(newMyCards as IFightCard[]);
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
      ) as IFightCard;

      const attackingCardElement = document.getElementById(
        `card-${selectedMyCardId}`
      );
      const targetCardElement = document.getElementById(
        `card-${selectedEnemyCardId}`
      );

      if (attackingCardElement && targetCardElement) {
        animateAttack(attackingCardElement, targetCardElement, () => {
          const { updatedCard: updatedEnemyCard, damage } = updateCardState(
            enemyCards.find((card) => card.id === selectedEnemyCardId)!,
            myCard,
            setDamageInfo
          );

          const updatedMyCard = restoreCardHealth(myCard, damage, setHealInfo);

          const updatedEnemyCards = enemyCards.map((card) =>
            card.id === selectedEnemyCardId ? updatedEnemyCard : card
          );
          setEnemyCards(updatedEnemyCards);

          const updatedMyCards = myCards.map((card) =>
            typeof card !== "number" && card.id === selectedMyCardId
              ? applySleepEffectToCard(updatedMyCard)
              : card
          );
          setMyCards(updatedMyCards as IFightCard[]);

          if (
            checkVictoryCondition(updatedEnemyCards, setIsWin, setIsShowResult)
          ) {
            return;
          }

          setTimeout(() => setDamageInfo(null), 1000);
          setTimeout(() => setHealInfo(null), 1000);
          setReloadableCards((prev) => [...prev, selectedMyCardId]);
          setSelectedEnemyCardId(null);
          setSelectedMyCardId(null);

          const aliveMyCards = myCards.filter(
            (card) => typeof card !== "number" && card.fightHealth > 0
          );

          if (reloadableCards.length + 1 === aliveMyCards.length) {
            setMyCards(removeSleepEffectsFromCards(myCards as IFightCard[]));
            setIsPlayerTurn(false);
            setReloadableCards([]);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (round !== 1) {
      const updateStatusEffectsForCards = (cards: IFightCard[]) => {
        return cards.map((card) => {
          const updatedEffects = card.statusEffects
            .map((effect) => ({
              ...effect,
              duration: effect.duration - 1,
            }))
            .filter((effect) => effect.duration > 0);

          const updatedCard = {
            ...card,
            statusEffects: updatedEffects,
          };

          return removeExpiredEffects(updatedCard);
        });
      };

      setEnemyCards((prevEnemyCards) =>
        updateStatusEffectsForCards(prevEnemyCards)
      );

      setMyCards(
        (prevMyCards) =>
          updateStatusEffectsForCards(
            prevMyCards.filter(
              (card) => typeof card !== "number"
            ) as IFightCard[]
          ) as IFightCard[]
      );
    }
  }, [round]);

  const cardsForInsert = cards.filter(
    (card) =>
      !myCards.some(
        (myCard) => typeof myCard !== "number" && myCard.id === card.id
      )
  );

  useEffect(() => {
    if (isWin && fightId) {
      const round = PVERounds.find(
        (round) => round.id === parseInt(fightId, 10)
      );
      if (round) {
        setReward(round.reward);
        useUserStore.getState().updatePVEProgress(round.id, round.reward);
      }
    }
  }, [isWin, fightId]);

  useEnemyAttack(
    enemyCards,
    setMyCards as React.Dispatch<React.SetStateAction<IFightCard[]>>,
    reloadableCards,
    setReloadableCards,
    isFight,
    isPlayerTurn,
    setIsPlayerTurn,
    setDamageInfo,
    setHealInfo,
    setIsShowResult,
    setIsWin,
    setEnemyCards,
    setRound
  );

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
            backdropFilter: `blur(8px)`,
            backgroundColor: "rgba(25, 25, 25, 0.5)",
            zIndex: "100",
          }}
        >
          {isWin === true ? (
            <Box
              sx={{
                ...centerContentStyles,
                flexDirection: "column",
                gap: "24px",
                p: "24px",
                borderRadius: "20px",
                border: "1px solid #000",
                backgroundColor: "rgb(60, 60, 60)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: colors.textColor,
                }}
              >
                Your Win!
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: colors.textColor,
                }}
              >
                {`REWARD ${reward}`}
              </Typography>
              <MainButton onClick={handleReturnToHomePage}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#000",
                  }}
                >
                  RETURN
                </Typography>
              </MainButton>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: colors.textColor,
              }}
            >
              Your Loss!
            </Typography>
          )}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          flexDirection: "column",
          alignItems: "center",
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
          healInfo={healInfo}
        />
      </Box>
      <Box
        sx={{
          ...centerContentStyles,
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: colors.textColor,
          }}
        >
          {isFight ? `Round: ${round}` : ""}
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: colors.textColor,
          }}
        >
          {isFight ? (isPlayerTurn ? "YOUR TURN" : "ENEMY'S TURN") : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgba(60, 60, 60, 0.5)",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          p: "24px 12px 24px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <FightCardsList
          reloadableCards={reloadableCards}
          isMyCardList
          selectedCardId={selectedMyCardId}
          event={handleSelectMyCardId}
          cards={myCards}
          onEmptySlotClick={handleEmptySlotClick}
          damageInfo={damageInfo}
          healInfo={healInfo}
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
