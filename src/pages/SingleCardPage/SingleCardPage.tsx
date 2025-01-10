import { Box, IconButton, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { centerContentStyles } from "../../core/theme/common.style";
import { Ambient } from "../../components/ui/Ambient";
import { colors } from "../../core/theme/colors";
import { MainButton } from "../../components/MainButton";
import { getNextRarity } from "../../core/utils/getNextRarity";
import { capitalize } from "../../core/utils/capitalize";

import {
  descriptionByClass,
  descriptionByElement,
  descriptionByFraction,
  elementEmojis,
  fractionEmojis,
  MAX_CARD_CHAR_VALUE,
} from "./constants";
import damage from "../../assets/damage.png";
import armor from "../../assets/armor.png";
import hp from "../../assets/hp.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { CardStat } from "./components/CardStat";
import { getIconByCardClass } from "../../core/utils/geIconByCardClass";
import { CustomTooltip } from "../../components/ui/CustomTooltip";
import { useCardStore } from "../../core/store/useCardStore";
import { getCardImage } from "../../core/utils/getCardImage";
import { useEffect, useMemo, useState } from "react";
import { Popup } from "../../components/Popup";
import { canMerge } from "../../core/utils/canMerge";
import { useGemStore } from "../../core/store/useGemStore";
import { useUserStore } from "../../core/store/useUserStore";
import { INSERT_GEM_PRICE } from "../../core/constants";
import { getBgByCardFraction } from "../../core/utils/getBgByFraction";

import { SingleCard } from "../CardsPage/components/SingleCard";
import { GemsPopup } from "./components/GemsPopup";
import { GemSlots } from "./components/GemSlots";
import { MergePopup } from "./components/MergePopup";
import { getRarityColor } from "../../core/utils/getRarityColor";
import { rarityByTier } from "../../core/utils/rarityByTier";
import { darkenColor } from "../../core/utils/darkenColor";
import { calculateTotalPower } from "../../core/utils/calculateTotalPower";

export const SingleCardPage = () => {
  useBackBtn();
  const { cardId } = useParams<{ cardId: string }>();
  if (!cardId) return null;
  const user = useUserStore((state) => state.user);

  const [isOpenMergePopup, setIsOpenMergePopup] = useState(false);
  const [isOpenGemsPopup, setIsOpenGemsPopup] = useState(false);
  const [selectedCardIdForMerge, setSelectedCardIdForMerge] = useState<
    null | number
  >(null);
  const [isUpgradetRarity, setIsUpgradetRarity] = useState(false);
  const [selectedGem, setSelectedGem] = useState<null | number>(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(
    null
  );
  const card = useCardStore((state) => state.getCardById(+cardId));

  if (!card) return null;

  const cardsForMerge = useMemo(() => {
    return card
      ? useCardStore.getState().getCardsByStars(+cardId, card.stars)
      : [];
  }, [card]);

  const upgradeCardRarity = useCardStore((state) => state.upgradeCardRarity);
  const upgradeCardLevel = useCardStore((state) => state.upgradeCardLevel);
  const insertGem = useGemStore((state) => state.insertGem);
  const removeGem = useGemStore((state) => state.removeGem);
  const addGemToCard = useCardStore((state) => state.addGemToCard);
  const removeGemFromCard = useCardStore((state) => state.removeGemFromCard);
  const gems = useGemStore((state) => state.gems);
  const availableGems = gems.filter((gem) => !gem.inserted);
  const mergeCards = useCardStore((state) => state.mergeCards);

  const handleOpenMergePopup = () => {
    setIsOpenMergePopup(true);
  };

  const handleOpenGemsPopup = (index: number) => {
    setSelectedSlotIndex(index);
    setIsOpenGemsPopup(true);
  };

  const handleUpgradeRarity = () => {
    upgradeCardRarity(card.id);
    setIsUpgradetRarity(true);
  };

  const handleUpgradeLevel = () => {
    upgradeCardLevel(card.id);
  };

  const handleInsertGem = (gemId: number) => {
    const gem = gems.find((g) => g.id === gemId);
    if (!gem || selectedSlotIndex === null) return;
    const { updateBalance } = useUserStore.getState();
    if (!user?.balance) {
      return;
    }
    updateBalance(user?.balance - INSERT_GEM_PRICE);
    insertGem(gemId);
    addGemToCard(card.id, gem, selectedSlotIndex);
    setIsOpenGemsPopup(false);
    setSelectedGem(null);
    setSelectedSlotIndex(null);
  };

  const handleSelectCard = (id: number) => {
    setSelectedCardIdForMerge(id);
  };

  const handleRemoveGem = (gemId: number, slotIndex: number) => {
    const gem = gems.find((g) => g.id === gemId);
    if (!gem) return;
    removeGem(gemId);
    removeGemFromCard(card.id, gem, slotIndex);
  };

  const handleSelectGem = (id: number) => {
    setSelectedGem(id);
  };

  const handleMerge = (cardId: number, cardToMergeId: number) => {
    mergeCards(cardId, cardToMergeId);
    setIsOpenMergePopup(false);
    setSelectedCardIdForMerge(null);
  };

  useEffect(() => {
    if (isUpgradetRarity) {
      const timer = setTimeout(() => {
        setIsUpgradetRarity(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isUpgradetRarity]);

  const cardStats = [
    {
      label: "Level",
      value: card.level,
      tooltipText: "Level up to increase the hero's characteristics",
      exp: card.exp,
    },
    {
      label: "Damage",
      value: card.damage + card.bonusDamage,
      bonusValue: card.bonusDamage,
      icon: damage,
      tooltipText: "Damage a hero can do",
      tooltipSubtitle: "Damage may vary by #15%#",
    },
    {
      label: "Armor",
      value: card.armor + card.bonusArmor,
      bonusValue: card.bonusArmor,
      icon: armor,
      tooltipText: "Armor reduces damage taken",
    },
    {
      label: "Health",
      value: card.health + card.bonusHealth,
      bonusValue: card.bonusHealth,
      icon: hp,
      tooltipText: "The more health a hero has, the more damage he can survive",
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${getBgByCardFraction(
          card.fraction
        )})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {isUpgradetRarity && (
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
          <SingleCard card={card} />
        </Box>
      )}
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
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "absolute",
                  top: "-8px",
                  right: "0",
                  zIndex: "1",
                  width: "48px",
                  height: "48px",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    zIndex: "-1",
                    stroke: darkenColor(
                      getRarityColor(rarityByTier[card.tier])
                    ),
                    strokeWidth: "2",
                  }}
                >
                  <path
                    d="M26.2128 4.22672C24.8915 3.1188 23.1075 3.11885 21.7862 4.22683C20.7513 5.09465 19.3054 6.36934 17.3509 8.21346C14.7985 8.29103 12.9547 8.40768 11.6525 8.52173C9.93425 8.67221 8.67265 9.93393 8.52224 11.6522C8.40824 12.9543 8.29165 14.7981 8.21413 17.3501C6.3697 19.3049 5.09474 20.7511 4.22669 21.7862C3.11839 23.108 3.11846 24.8925 4.22682 26.2141C5.09487 27.2492 6.3698 28.6952 8.21413 30.6499C8.29165 33.2019 8.40823 35.0455 8.52222 36.3477C8.67264 38.0661 9.93434 39.3279 11.6527 39.4783C12.9549 39.5924 14.7987 39.7091 17.3509 39.7866C19.3049 41.6303 20.7506 42.9049 21.7854 43.7728C23.1072 44.8812 24.8919 44.8813 26.2136 43.7729C27.2485 42.905 28.6944 41.6304 30.6484 39.7867C33.202 39.7091 35.0465 39.5924 36.3489 39.4783C38.0669 39.3279 39.3282 38.0665 39.4788 36.3487C39.593 35.0461 39.7097 33.2014 39.7874 30.6477C41.6308 28.6939 42.9051 27.2483 43.7728 26.2136C44.8808 24.8923 44.8809 23.1082 43.7729 21.7867C42.9052 20.7519 41.6309 19.3063 39.7874 17.3523C39.7097 14.7984 39.5929 12.9538 39.4788 11.6513C39.3282 9.93348 38.067 8.67225 36.3491 8.52177C35.0467 8.40769 33.2022 8.29098 30.6485 8.2134C28.694 6.36924 27.2478 5.09454 26.2128 4.22672Z"
                    fill={getRarityColor(rarityByTier[card.tier])}
                  />
                </svg>

                <Typography
                  sx={{
                    width: "100%",
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "700",
                    position: "relative",
                    textShadow: `
                    -1px -1px 0 black,
                    1px -1px 0 black,
                    -1px 1px 0 black,
                    1px 1px 0 black
                  `,
                  }}
                >
                  {card.tier === "SS" ? (
                    <span
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "-2px",
                          left: "2px",
                          zIndex: 0,
                        }}
                      >
                        S
                      </span>
                      <span
                        style={{
                          position: "relative",
                          top: "2px",
                          left: "-2px", // немного наложить на первую букву
                          zIndex: 1,
                        }}
                      >
                        S
                      </span>
                    </span>
                  ) : card.tier.includes("+") ? (
                    <>
                      {card.tier.replace("+", "")}
                      <span
                        style={{
                          fontSize: "14px",
                          position: "absolute",
                          top: "-4px",
                          right: "14px",
                          zIndex: "2",
                        }}
                      >
                        +
                      </span>
                    </>
                  ) : (
                    card.tier
                  )}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: "40px",
                  padding: "4px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  backgroundColor: getRarityColor(card.rarity),
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    textShadow: `
                   -1px -1px 0 black,
                   1px -1px 0 black,
                   -1px 1px 0 black,
                   1px 1px 0 black
                 `,
                    textTransform: "uppercase",
                  }}
                >
                  {card.rarity}
                </Typography>
              </Box>
              <Box
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  position: "relative",
                  textShadow: `
                  -1px -1px 0 black,
                  1px -1px 0 black,
                  -1px 1px 0 black,
                  1px 1px 0 black
                `,
                }}
              >
                <span>{`${card.name} #${card.id}`}</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
              >
                <CustomTooltip
                  openOnClick
                  title="Merge with duplicate heroes to increase your rating"
                >
                  <IconButton
                    sx={{
                      color: colors.secondaryTextColor,
                      zIndex: 1,
                      position: "absolute",
                      left: "-24px",
                      padding: "4px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <InfoOutlinedIcon
                      sx={{
                        width: "12px",
                        height: "12px",
                        cursor: "help",
                      }}
                    />
                  </IconButton>
                </CustomTooltip>
                <Rating
                  value={card.stars}
                  readOnly
                  sx={{
                    "& .MuiRating-icon": {
                      marginLeft: "-2px", // Негативный отступ для перекрытия
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#fff",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  ...centerContentStyles,
                  position: "relative",
                  zIndex: 2,
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "288px",
                  padding: "40px",
                  borderRadius: "20px",
                  aspectRatio: "1",
                }}
              >
                <GemSlots
                  gemIds={card.gemIds?.filter(
                    (id): id is number => id !== null
                  )}
                  sockets={card.sockets}
                  gems={gems}
                  handleRemoveGem={handleRemoveGem}
                  handleOpenGemsPopup={handleOpenGemsPopup}
                />

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
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  position: "relative",
                  mt: "20px",
                }}
              >
                <CustomTooltip
                  openOnClick
                  title="Total power is the sum of all the characteristics of the hero"
                >
                  <IconButton
                    sx={{
                      color: colors.secondaryTextColor,
                      zIndex: 1,
                      position: "absolute",
                      left: "-24px",
                      padding: "4px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <InfoOutlinedIcon
                      sx={{
                        width: "12px",
                        height: "12px",
                        cursor: "help",
                      }}
                    />
                  </IconButton>
                </CustomTooltip>
                <Typography
                  sx={{
                    fontSize: "24px",
                    mr: "4px",
                    fontWeight: "600",
                    color: colors.textColor,
                    textShadow: `
                    -1px -1px 0 black,
                    1px -1px 0 black,
                    -1px 1px 0 black,
                    1px 1px 0 black
                  `,
                  }}
                >
                  {`Power:`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: colors.primary,
                    textShadow: `
                    -1px -1px 0 black,
                    1px -1px 0 black,
                    -1px 1px 0 black,
                    1px 1px 0 black
                  `,
                  }}
                >
                  {calculateTotalPower(card).toFixed(0)}
                </Typography>
              </Box>
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
                  fontSize: "16px",
                  lineHeight: "20px !important",
                  fontWeight: "500",
                  color: colors.secondaryTextColor,
                }}
              >
                {card.description}
              </Typography>
              {cardStats.map((stat, index) => (
                <CardStat
                  bonusValue={stat.bonusValue}
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  tooltipText={stat.tooltipText}
                  tooltipSubtitle={stat.tooltipSubtitle}
                  exp={stat.exp}
                  maxValue={MAX_CARD_CHAR_VALUE}
                />
              ))}
              <Box
                sx={{
                  mt: "12px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <CustomTooltip
                      openOnClick
                      title={capitalize(card.fraction)}
                      text={descriptionByFraction[card.fraction]}
                    >
                      <IconButton
                        sx={{
                          color: colors.secondaryTextColor,
                          zIndex: 1,
                          position: "absolute",
                          left: "-20px",
                          padding: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            width: "12px",
                            height: "12px",
                            cursor: "help",
                          }}
                        />
                      </IconButton>
                    </CustomTooltip>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      Fraction
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "48px",
                    }}
                  >
                    {fractionEmojis[card.fraction]}
                  </Typography>
                </Box>
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <CustomTooltip
                      openOnClick
                      title={capitalize(card.class)}
                      text={descriptionByClass[card.class]}
                    >
                      <IconButton
                        sx={{
                          color: colors.secondaryTextColor,
                          zIndex: 1,
                          position: "absolute",
                          left: "-20px",
                          padding: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            width: "12px",
                            height: "12px",
                            cursor: "help",
                          }}
                        />
                      </IconButton>
                    </CustomTooltip>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      Class
                    </Typography>
                  </Box>
                  <img
                    src={getIconByCardClass(card.class)}
                    width={48}
                    height={48}
                    style={{
                      display: "block",
                    }}
                  />
                </Box>

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
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <CustomTooltip
                      openOnClick
                      title={capitalize(card.element)}
                      text={descriptionByElement[card.element]}
                    >
                      <IconButton
                        sx={{
                          color: colors.secondaryTextColor,
                          zIndex: 1,
                          position: "absolute",
                          left: "-20px",
                          padding: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            width: "12px",
                            height: "12px",
                            cursor: "help",
                          }}
                        />
                      </IconButton>
                    </CustomTooltip>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      Damage
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "48px",
                    }}
                  >
                    {elementEmojis[card.element]}
                  </Typography>
                </Box>
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
          {card.stars < 5 && (
            <Box sx={{ width: "100%" }}>
              <MainButton
                fullWidth
                onClick={handleOpenMergePopup}
                disabled={!canMerge(card.level, card.stars)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "canter",
                    gap: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: !canMerge(card.level, card.stars)
                        ? colors.secondaryTextColor
                        : "#000",
                    }}
                  >
                    MERGE
                  </Typography>
                </Box>
              </MainButton>
            </Box>
          )}
          {getNextRarity(card.rarity) && (
            <MainButton fullWidth onClick={handleUpgradeRarity}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#000",
                  textTransform: "uppercase",
                }}
              >
                {`Upgrade to ${getNextRarity(card.rarity)}`}
              </Typography>
            </MainButton>
          )}
          <MainButton fullWidth onClick={handleUpgradeLevel}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              {`Upgrade to ${card.level + 1}`}
            </Typography>
          </MainButton>
        </Box>
      </Box>

      <Popup isShow={isOpenMergePopup} setIsShow={setIsOpenMergePopup}>
        <MergePopup
          cards={cardsForMerge}
          cardId={+cardId}
          handleMerge={handleMerge}
          selectedCardIdForMerge={selectedCardIdForMerge}
          handleSelectCard={handleSelectCard}
        />
      </Popup>
      <Popup
        isShow={isOpenGemsPopup}
        setIsShow={setIsOpenGemsPopup}
        eventOnClose={selectedGem ? () => setSelectedGem(null) : undefined}
      >
        <GemsPopup
          gems={availableGems}
          selectedGem={selectedGem}
          userBalance={user?.balance}
          gemIds={card.gemIds?.filter((id): id is number => id !== null)}
          handleInsertGem={handleInsertGem}
          handleSelectGem={handleSelectGem}
        />
      </Popup>
    </Box>
  );
};
