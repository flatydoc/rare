import { Box, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { gems } from "../CardsPage/constants";
import { centerContentStyles } from "../../core/theme/common.style";
import { Ambient } from "../../components/ui/Ambient";
import { getRarityColor } from "../../core/utils/getRarityColor";
import { colors } from "../../core/theme/colors";
import { MainButton } from "../../components/MainButton";
import { getNextRarity } from "../../core/utils/getNextRarity";
import { capitalize } from "../../core/utils/capitalize";

import AddIcon from "@mui/icons-material/Add";
import {
  calculateSlotPositions,
  descriptionByClass,
  descriptionByElement,
  descriptionByFraction,
  elementEmojis,
  fractionEmojis,
} from "./constants";
import damage from "../../assets/damage.png";
import armor from "../../assets/armor.png";
import hp from "../../assets/hp.png";

import { CardStat } from "./components/CardStat";
import { getIconByCardClass } from "../../core/utils/geIconByCardClass";
import { CustomTooltip } from "../../components/ui/CustomTooltip";
import { useCardStore } from "../../core/store/useCardStore";
import { getCardImage } from "../../core/utils/getCardImage";
import { useMemo, useState } from "react";
import { Popup } from "../../components/Popup";
import { CardsList } from "../CardsPage/components/CardsList";

export const SingleCardPage = () => {
  useBackBtn();
  const { cardId } = useParams<{ cardId: string }>();
  if (!cardId) return null;
  const [isOpenMergePopup, setIsOpenMergePopup] = useState(false);
  const [selectedCardForMerge, setSelectedCardForMerge] = useState<
    null | number
  >(null);

  const card = useCardStore((state) => state.getCardById(+cardId));

  if (!card) return null;

  const cardsForMerge = useMemo(() => {
    return card
      ? useCardStore.getState().getCardsByNumber(card.number, +cardId)
      : [];
  }, [card]);

  const upgradeCardRarity = useCardStore((state) => state.upgradeCardRarity);
  const mergeCards = useCardStore((state) => state.mergeCards);

  const getGemImage = (gemId: number) => {
    const gem = gems.find((g) => g.id === gemId);
    return gem ? gem.img : undefined;
  };

  const handleOpenMergePopup = () => {
    setIsOpenMergePopup(true);
  };

  const handleUpgradeRarity = () => {
    upgradeCardRarity(card.id);
  };

  const handleSelectCard = (id: number) => {
    setSelectedCardForMerge(id);
  };

  const handleMerge = (cardId: number, cardToMergeId: number) => {
    mergeCards(cardId, cardToMergeId);
    setIsOpenMergePopup(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      {card ? (
        <Box
          sx={{
            height: "100%",
            p: "24px 16px 104px 16px",
            overflowY: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "48px",
                width: "100%",
              }}
            >
              <Box
                style={{
                  ...centerContentStyles,
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "288px",
                  padding: "40px",
                  borderRadius: "20px",
                  position: "relative",
                  aspectRatio: "1",
                  boxShadow: `0 1px 2px 0 inset ${getRarityColor(card.rarity)}`,
                }}
              >
                {card.sockets > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "16px 0",
                      zIndex: "1",
                    }}
                  >
                    {calculateSlotPositions(card.sockets).map((pos, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "absolute",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(60, 60, 60, 0.7)",
                          border: `1px dashed ${colors.secondaryTextColor}`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          left: `calc(50% + ${pos.x}px)`,
                          top: `calc(50% + ${pos.y}px)`,
                          transform: "translate(-50%, -50%)",
                          cursor: "pointer",
                        }}
                      >
                        {card.gemIds[index] ? (
                          <img
                            src={getGemImage(card.gemIds[index])}
                            alt={`Gem ${card.gemIds[index]}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <AddIcon
                            sx={{
                              color: colors.textColor,
                              opacity: 0.4,
                              transition: "opacity 0.3s ease-in-out",
                              "&:hover": {
                                opacity: 1,
                              },
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
                <Ambient rarity={card.rarity}>
                  <img
                    src={getCardImage(card.number, card.rarity)}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Ambient>
                <CustomTooltip title="Merge with duplicate heroes to increase your rating">
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      bottom: "-18px",
                      transform: "translateX(-50%)",
                      backgroundColor: "rgb(35, 35, 35)",
                      borderRadius: "40px",
                      padding: "6px 12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Rating
                      value={card.stars}
                      readOnly
                      sx={{
                        "& .MuiRating-iconEmpty": {
                          color: "#fff",
                        },
                      }}
                    />
                  </Box>
                </CustomTooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  backgroundColor: "rgba(60, 60, 60, 0.5)",
                  borderRadius: "20px",
                  padding: "24px 12px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                  }}
                >{`${card.name} #${card.id}`}</Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: colors.secondaryTextColor,
                    mb: "12px",
                  }}
                >
                  {card.description}
                </Typography>
                <CardStat
                  label="Level"
                  value={card.level}
                  tooltipText="Level up to increase the hero's characteristics"
                  exp={card.exp}
                />
                <CardStat
                  label="Power"
                  value={card.power}
                  icon={damage}
                  tooltipText="Damage a hero can do"
                  tooltipSubtitle="Damage may vary by 15%"
                />
                <CardStat
                  label="Armor"
                  value={card.armor}
                  icon={armor}
                  tooltipText="Armor reduces damage taken"
                />
                <CardStat
                  label="Health"
                  value={card.health}
                  icon={hp}
                  tooltipText="The more health a hero has, the more damage he can survive"
                />
                <Box
                  sx={{
                    mt: "12px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomTooltip
                    title={capitalize(card.fraction)}
                    text={descriptionByFraction[card.fraction]}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: "center",
                        alignItems: "center",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Box
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                          position: "absolute",
                          top: "20%",
                          bottom: "20%",
                          right: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: colors.secondaryTextColor,
                        }}
                      >
                        Fraction
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "48px",
                        }}
                      >
                        {fractionEmojis[card.fraction]}
                      </Typography>
                    </Box>
                  </CustomTooltip>
                  <CustomTooltip
                    title={capitalize(card.class)}
                    text={descriptionByClass[card.class]}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: "center",
                        alignItems: "center",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Box
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                          position: "absolute",
                          top: "20%",
                          bottom: "20%",
                          right: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: colors.secondaryTextColor,
                        }}
                      >
                        Class
                      </Typography>
                      <img
                        src={getIconByCardClass(card.class)}
                        width={48}
                        height={48}
                        style={{
                          display: "block",
                        }}
                      />
                    </Box>
                  </CustomTooltip>
                  <CustomTooltip
                    title={capitalize(card.element)}
                    text={descriptionByElement[card.element]}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: "center",
                        alignItems: "center",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: colors.secondaryTextColor,
                        }}
                      >
                        Damage type
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "48px",
                        }}
                      >
                        {elementEmojis[card.element]}
                      </Typography>
                    </Box>
                  </CustomTooltip>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MainButton fullWidth onClick={handleOpenMergePopup}>
              <Typography>Merge</Typography>
            </MainButton>
            <MainButton fullWidth onClick={handleUpgradeRarity}>
              <Typography sx={{}}>
                {" "}
                {`Upgrade to ${
                  getNextRarity(card.rarity)
                    ? capitalize(getNextRarity(card.rarity)!)
                    : "Max Level"
                }`}
              </Typography>
            </MainButton>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6">Card not found</Typography>
      )}
      <Popup isShow={isOpenMergePopup} setIsShow={setIsOpenMergePopup}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Typography
              sx={{
                whiteSpace: "nowrap",
                width: "100%",
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "700",
                color: colors.textColor,
              }}
            >
              MERGER
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: colors.secondaryTextColor,
                mb: "24px",
              }}
            >
              Select heroes to merge
            </Typography>
            <CardsList event={handleSelectCard} cards={cardsForMerge} />
          </Box>
          <MainButton
            disabled={!selectedCardForMerge}
            fullWidth
            onClick={() =>
              selectedCardForMerge && handleMerge(+cardId, selectedCardForMerge)
            }
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: selectedCardForMerge
                  ? "#000"
                  : colors.secondaryTextColor,
              }}
            >
              {selectedCardForMerge ? "MERGE" : "SELECT CARD"}
            </Typography>
          </MainButton>
        </Box>
      </Popup>
    </Box>
  );
};
