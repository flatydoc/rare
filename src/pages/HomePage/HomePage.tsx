import { Box, IconButton, Typography } from "@mui/material";
import { Header } from "./components/Header";
// import { useEffect, useRef, useState } from "react";
import { useState } from "react";

import { Popup } from "../../components/Popup";
import {
  battleMods,
  imgByLeague,
  PVERounds,
  rewardByLeague,
} from "./constants";
import { colors } from "../../core/theme/colors";
import { useUserStore } from "../../core/store/useUserStore";
import notcoin from "../../assets/notcoin.png";
import { MainButton } from "../../components/MainButton";
import { getLeagueByLevel } from "../../core/utils/getLeagueByLevel";
import { RewardType } from "../../core/types";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../core/enums";
import { centerContentStyles } from "../../core/theme/common.style";
import full_energy from "../../assets/energy-full.png";
import { SingleCard } from "../CardsPage/components/SingleCard";
import disabled_pattern from "../../assets/disabled_pattern.png";
import { ENERGY_FOR_PVE, MAX_ENERGY } from "../../core/constants";
import { EnergyProgressBar } from "./components/EnergyProgressBar";
import lock from "../../assets/lock.png";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export const HomePage = () => {
  const [isShowEarnPopup, setIsShowEarnPopup] = useState<boolean>(false);
  const [isShowSelectPVEBattlePopup, setIsShowSelectPVEBattlePopup] =
    useState<boolean>(false);
  const [isShowFightModeSelectPopup, setIsShowFightModeSelectPopup] =
    useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const [claimedRewards, setClaimedRewards] = useState<boolean[]>(
    rewardByLeague.map(() => false)
  );
  const updateBalance = useUserStore((state) => state.updateBalance);
  const updateEnergy = useUserStore((state) => state.updateEnergy);

  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleOpenSelectBattlePopup = (energy: number) => {
    if (user.energy < energy) return;
    setIsShowSelectPVEBattlePopup(true);
    setIsShowFightModeSelectPopup(false);
  };

  const handleStartFight = (id: number) => {
    if (user.energy < ENERGY_FOR_PVE) return;
    updateEnergy(ENERGY_FOR_PVE);
    navigate(`/${RouteList.PVE}/${id}`);
  };

  const progress = (Number(user.energy) / MAX_ENERGY) * 100;

  const handleClaimReward = (
    rewardType: RewardType,
    rewardValue?: number,
    index?: number
  ) => {
    if (rewardType === "inGame" && rewardValue) {
      updateBalance(user.balance + rewardValue);
    }

    if (index !== undefined) {
      setClaimedRewards((prev) => {
        const newClaimedRewards = [...prev];
        newClaimedRewards[index] = true;
        return newClaimedRewards;
      });
    }
  };

  const currentLeagueIndex = rewardByLeague.findIndex(
    (reward) => reward.league === getLeagueByLevel(user.level)
  );

  const isRoundAccessible = (roundId: number): boolean => {
    return roundId === (user.completedPVE ?? 0) + 1;
  };

  const isRoundCompleted = (roundId: number): boolean => {
    return roundId <= (user.completedPVE ?? 0);
  };

  // const refs = useRef<Record<number, HTMLDivElement | null>>({});
  // useEffect(() => {
  //   if (isShowSelectPVEBattlePopup) {
  //     const accessibleRoundId = (user.completedPVE ?? 0) + 1;
  //     if (refs.current[accessibleRoundId]) {
  //       refs.current[accessibleRoundId].scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }
  //   }
  // }, [isShowSelectPVEBattlePopup, user.completedPVE]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        p: "24px 16px 104px 16px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Header user={user} />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              margin: "0 auto",
            }}
          >
            <Typography
              sx={{
                whiteSpace: "nowrap",
                fontSize: "32px",
                fontWeight: "700",
              }}
            >
              PLAY TO EARN
            </Typography>
            <Box
              onClick={() => setIsShowEarnPopup(true)}
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translate(60%, -20%)",
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={notcoin}
                style={{
                  width: "54px",
                  height: "54px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "4px",
                  left: "51%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(60, 60, 60, 0.5)",
                  borderRadius: "40px",
                  padding: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: colors.textColor,
                    fontSize: "8px",
                    fontWeight: "600",
                  }}
                >
                  CLAIM
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <MainButton onClick={() => setIsShowFightModeSelectPopup(true)}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#000",
            }}
          >
            {"PLAY"}
          </Typography>
        </MainButton>
      </Box>

      <Popup isShow={isShowEarnPopup} setIsShow={setIsShowEarnPopup}>
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
            PLAY TO EARN
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: colors.secondaryTextColor,
            }}
          >
            Collect rewards according to your league
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {rewardByLeague.map(
              (
                { id, league, reward, rewardColor, rewardType, rewardValue },
                index
              ) => {
                const isClaimable = index <= currentLeagueIndex;
                const isClaimed = claimedRewards[index];

                return (
                  <Box
                    key={id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minHeight: "72px",
                      p: "16px",
                      backgroundColor: "rgba(225, 225, 225, 0.2)",
                      borderRadius: "20px",
                      border: "1px solid rgb(15, 15, 15)",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <img
                        src={imgByLeague[league]}
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "cover",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: colors.textColor,
                          }}
                        >
                          {league}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: rewardColor,
                          }}
                        >
                          {reward}
                        </Typography>
                      </Box>
                    </Box>
                    <MainButton
                      disabled={!isClaimable || isClaimed}
                      onClick={() =>
                        handleClaimReward(rewardType, rewardValue, index)
                      }
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color:
                            isClaimable && !isClaimed
                              ? "#000"
                              : colors.secondaryTextColor,
                        }}
                      >
                        {isClaimed ? "CLAIMED" : "CLAIM"}
                      </Typography>
                    </MainButton>
                  </Box>
                );
              }
            )}
          </Box>
          <MainButton fullWidth onClick={() => setIsShowEarnPopup(false)}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#000",
              }}
            >
              OK
            </Typography>
          </MainButton>
        </Box>
      </Popup>
      <Popup
        isShow={isShowFightModeSelectPopup}
        setIsShow={setIsShowFightModeSelectPopup}
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
            PLAY TO EARN
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: colors.secondaryTextColor,
            }}
          >
            Select battle mode
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "fit-content",
              padding: "12px",
              backgroundColor: "rgba(225, 225, 225, 0.2)",
              borderRadius: "20px",
              border: "1px solid rgb(15, 15, 15)",
              margin: "0 auto",
            }}
          >
            <img src={full_energy} height={24} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "4px",
                alignItems: "center",
                width: "100px",
              }}
            >
              <Typography
                sx={{
                  color: colors.textColor,
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user.energy}
                <span
                  style={{
                    color: colors.secondaryTextColor,
                    fontSize: "10px",
                  }}
                >
                  /{MAX_ENERGY}
                </span>
              </Typography>
              <EnergyProgressBar progress={progress} />
            </Box>

            <IconButton
              sx={{
                backgroundColor: "rgba(225, 225, 225, 0.2)",
                color: colors.textColor,
                width: "24px",
                height: "24px",
                "&:hover": {
                  backgroundColor: "rgba(225, 225, 225, 0.2)",
                },
                "&:focus": {
                  backgroundColor: "rgba(225, 225, 225, 0.2)",
                },
              }}
            >
              <AddRoundedIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              ...centerContentStyles,
              width: "100%",
              gap: "8px",
            }}
          >
            {battleMods.map((mode) => (
              <Box
                onClick={
                  mode.isAvailable
                    ? () => handleOpenSelectBattlePopup(mode.energy)
                    : undefined
                }
                sx={{
                  ...centerContentStyles,
                  position: "relative",
                  flexDirection: "column",
                  gap: "12px",
                  width: "100%",
                  borderRadius: "20px",
                  padding: "16px",
                  backgroundColor: "rgba(60, 60, 60, 0.8)",
                  overflow: "hidden",
                }}
              >
                {!mode.isAvailable && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                      backdropFilter: "blur(1px)",
                      backgroundImage: `url(${disabled_pattern})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      Cooming soon
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: colors.textColor,
                    }}
                  >
                    {mode.name}
                  </Typography>
                  <Box
                    sx={{
                      ...centerContentStyles,
                      padding: "4px 8px",
                      gap: "2px",
                      borderRadius: "20px",
                      backgroundColor:
                        user.energy < mode.energy ? colors.red : colors.green,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: colors.textColor,
                      }}
                    >{`For ${mode.energy}`}</Typography>
                    <img src={full_energy} width={16} />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    width: "100%",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: colors.secondaryTextColor,
                    textAlign: "left",
                  }}
                >
                  {mode.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Popup>
      <Popup
        isShow={isShowSelectPVEBattlePopup}
        setIsShow={setIsShowSelectPVEBattlePopup}
        title="Challenge the bot and earn"
        eventOnClose={() => setIsShowSelectPVEBattlePopup(false)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {PVERounds.map((round) => {
            const accessible = isRoundAccessible(round.id);
            const completed = isRoundCompleted(round.id);
            const isAvailable = accessible && !completed;
            return (
              <Box
                // ref={(el: HTMLDivElement | null) =>
                //   (refs.current[round.id] = el)
                // }
                key={round.id}
                onClick={() => isAvailable && handleStartFight(round.id)}
                sx={{
                  width: "100%",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(60, 60, 60, 0.8)",
                  borderRadius: "20px",
                  gap: "20px",
                  position: "relative",
                  pointerEvents: isAvailable ? "auto" : "none",
                  overflow: "hidden",
                }}
              >
                {!isAvailable && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                      backdropFilter: "blur(1px)",
                      backgroundImage: !completed
                        ? `url(${disabled_pattern})`
                        : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: "100",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: completed
                          ? colors.green
                          : colors.secondaryTextColor,
                      }}
                    >
                      {completed && "Completed"}
                    </Typography>
                    {!completed && <img src={lock} width={64} />}
                    <img />
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: colors.textColor,
                    }}
                  >
                    {round.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: colors.textColor,
                    }}
                  >
                    {round.reward}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  {round.enemyCards.map((card) => (
                    <SingleCard key={card.id} card={card} />
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Popup>
    </Box>
  );
};
