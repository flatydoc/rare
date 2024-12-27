import { Box, IconButton, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { centerContentStyles } from "../../core/theme/common.style";
import { Ambient } from "../../components/ui/Ambient";
import { colors } from "../../core/theme/colors";
import { MainButton } from "../../components/MainButton";
import { getNextRarity } from "../../core/utils/getNextRarity";
import { capitalize } from "../../core/utils/capitalize";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  calculateSlotPositions,
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
import { useMemo, useState } from "react";
import { Popup } from "../../components/Popup";
import { CardsList } from "../CardsPage/components/CardsList";
import { canMerge } from "../../core/utils/canMerge";
import { GemsList } from "../GemsPage/components/GemsList";
import { useGemStore } from "../../core/store/useGemStore";
import { useUserStore } from "../../core/store/useUserStore";
import { INSERT_GEM_PRICE } from "../../core/constants";
import { getBgByCardFraction } from "../../core/utils/getBgByFraction";
import { getRarityColor } from "../../core/utils/getRarityColor";
import { GemInfo } from "../SingleGemPage/components/GemInfo";

export const SingleCardPage = () => {
  useBackBtn();
  const { cardId } = useParams<{ cardId: string }>();
  if (!cardId) return null;
  const user = useUserStore((state) => state.user);

  const [isOpenMergePopup, setIsOpenMergePopup] = useState(false);
  const [isOpenGemsPopup, setIsOpenGemsPopup] = useState(false);
  const [selectedCardForMerge, setSelectedCardForMerge] = useState<
    null | number
  >(null);

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

  const disableInsertGem =
    !selectedGem ||
    user?.balance === undefined ||
    user?.balance < INSERT_GEM_PRICE;

  const handleOpenMergePopup = () => {
    setIsOpenMergePopup(true);
  };

  const handleOpenGemsPopup = (index: number) => {
    setSelectedSlotIndex(index);
    setIsOpenGemsPopup(true);
  };

  const handleUpgradeRarity = () => {
    upgradeCardRarity(card.id);
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
    setSelectedCardForMerge(id);
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
    setSelectedCardForMerge(null);
  };

  const cardStats = [
    {
      label: "Level",
      value: card.level,
      tooltipText: "Level up to increase the hero's characteristics",
      exp: card.exp,
    },
    {
      label: "Power",
      value: card.power + card.bonusPower,
      bonusValue: card.bonusPower,
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
                  {calculateSlotPositions(6).map((pos, index) => {
                    const isSlotActive = index < card.sockets; // Проверяем, активен ли слот
                    const gemId = card.gemIds[index]; // Получаем ID гема для слота
                    const gem = gemId ? gems.find((g) => g.id === gemId) : null; // Получаем объект гема, если он существует

                    return (
                      <Box
                        key={index}
                        onClick={() => {
                          //Клик возможен только если слот активен и либо пуст, либо содержит съёмный гем
                          if (isSlotActive && !gem) {
                            handleOpenGemsPopup(index);
                          }
                        }}
                        sx={{
                          position: "absolute",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: gem
                            ? "transparent" // Если в слоте есть гем, фон становится прозрачным
                            : isSlotActive
                            ? "rgba(60, 60, 60, 0.7)" // Фон активного слота
                            : "rgba(30, 30, 30, 0.1)", // Фон неактивного слота
                          border: isSlotActive
                            ? gem
                              ? gem.removable
                                ? "1px dashed gray" // Граница съёмного гема
                                : "1px solid gray" // Граница несъёмного гема
                              : `1px dashed ${colors.secondaryTextColor}` // Граница пустого слота
                            : "1px solid rgba(100, 100, 100, 0.4)", // Граница заблокированного слота
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          left: `calc(50% + ${pos.x}px)`,
                          top: `calc(50% + ${pos.y}px)`,
                          transform: "translate(-50%, -50%)",
                          cursor:
                            isSlotActive && (gem?.removable || !gem)
                              ? "pointer"
                              : "not-allowed", // Курсор меняется в зависимости от активности
                        }}
                      >
                        {isSlotActive ? (
                          gem ? (
                            // Если слот активен и содержит гем, отображаем его
                            <CustomTooltip
                              timeout={5}
                              titleColor={getRarityColor(gem.rarity)}
                              title={gem.name}
                              text={gem.tooltipTitle}
                              openOnClick
                              btnText="Remove"
                              event={
                                gem.removable
                                  ? () => handleRemoveGem(gem.id, index)
                                  : undefined
                              }
                            >
                              <Box
                                sx={{
                                  padding: "4px",
                                  borderRadius: "50%",
                                  boxShadow: `0 1px 8px 0 inset ${getRarityColor(
                                    gem.rarity
                                  )}`,
                                }}
                              >
                                <img
                                  src={gem.img}
                                  alt={`Gem ${gem.id}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Box>
                            </CustomTooltip>
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
                          )
                        ) : (
                          <BlockOutlinedIcon
                            sx={{
                              color: "rgba(200, 200, 200, 0.4)",
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>

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
              <Box
                sx={{
                  borderRadius: "40px",
                  padding: "6px 12px",
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
                    "& .MuiRating-iconEmpty": {
                      color: "#fff",
                    },
                  }}
                />
              </Box>
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
            <CardsList
              selectedCardId={selectedCardForMerge}
              event={handleSelectCard}
              cards={cardsForMerge}
            />
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
      <Popup
        isShow={isOpenGemsPopup}
        setIsShow={setIsOpenGemsPopup}
        eventOnClose={selectedGem ? () => setSelectedGem(null) : undefined}
      >
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
              GEMS
            </Typography>
            {!selectedGem && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: colors.secondaryTextColor,
                  mb: "24px",
                }}
              >
                Select gem
              </Typography>
            )}
            {selectedGem ? (
              <GemInfo gemId={selectedGem} />
            ) : (
              <GemsList
                selectedGemId={selectedGem}
                event={handleSelectGem}
                gems={availableGems}
              />
            )}
          </Box>
          {selectedGem && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: colors.secondaryTextColor,
                  }}
                >
                  Your balance:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: colors.textColor,
                  }}
                >
                  {user?.balance}
                </Typography>
              </Box>
              <MainButton
                disabled={disableInsertGem}
                fullWidth
                onClick={() => selectedGem && handleInsertGem(selectedGem)}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: disableInsertGem
                      ? colors.secondaryTextColor
                      : "#000",
                  }}
                >
                  {`INSERT GEM FOR ${INSERT_GEM_PRICE}`}
                </Typography>
              </MainButton>
            </Box>
          )}
        </Box>
      </Popup>
    </Box>
  );
};
