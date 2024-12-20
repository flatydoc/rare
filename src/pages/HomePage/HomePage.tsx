import { Box, Typography } from "@mui/material";
import { Header } from "./components/Header";
import { useState } from "react";
import { Popup } from "../../components/Popup";
import { imgByLeague, rewardByLeague } from "./constants";
import { colors } from "../../core/theme/colors";
import { useUserStore } from "../../core/store/useUserStore";
import notcoin from "../../assets/notcoin.png";
import { MainButton } from "../../components/MainButton";
import { getLeagueByLevel } from "../../core/utils/getLeagueByLevel";
import { RewardType } from "../../core/types";

export const HomePage = () => {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const [claimedRewards, setClaimedRewards] = useState<boolean[]>(
    rewardByLeague.map(() => false)
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleClaimReward = (
    rewardType: RewardType,
    rewardValue?: number,
    index?: number
  ) => {
    const { updateBalance } = useUserStore.getState();

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
  return (
    <Box>
      <Header user={user} />
      <Box
        sx={{
          m: "24px 0",
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            whiteSpace: "nowrap",
            fontSize: "32px",
            fontWeight: "700",
            position: "relative",
            display: "inline-block",
            margin: "0 auto",
          }}
        >
          PLAY TO EARN
          <Box
            onClick={() => setIsShowPopup(true)}
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
        </Typography>
      </Box>
      <Popup isShow={isShowPopup} setIsShow={setIsShowPopup}>
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
                      borderRadius: "17px",
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
          <MainButton fullWidth onClick={() => setIsShowPopup(false)}>
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
    </Box>
  );
};
