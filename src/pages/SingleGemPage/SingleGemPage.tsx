import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBackBtn } from "../../core/hooks/useBackBtn";
import { GemInfo } from "./components/GemInfo";
import { useGemStore } from "../../core/store/useGemStore";
import { useUserStore } from "../../core/store/useUserStore";
import {
  INSERT_GEM_PRICE,
  MAX_LEVELS,
  UPDATE_GEM_PRICE,
} from "../../core/constants";
import { MainButton } from "../../components/MainButton";
import { colors } from "../../core/theme/colors";

export const SingleGemPage = () => {
  useBackBtn();
  const { gemId } = useParams<{ gemId: string }>();
  if (!gemId) return null;
  const upgradeGemLevel = useGemStore((state) => state.upgradeGemLevel);
  const user = useUserStore((state) => state.user);
  const gem = useGemStore((state) => state.getGemById(+gemId));

  if (!gem) return null;

  const maxLevel = MAX_LEVELS[gem.rarity];

  const handleUpgradeLevel = () => {
    const { updateBalance } = useUserStore.getState();
    if (!user?.balance) {
      return;
    }
    updateBalance(user?.balance - UPDATE_GEM_PRICE);
    upgradeGemLevel(+gemId);
  };

  const disableUpgradeGem =
    user?.balance === undefined || user?.balance < INSERT_GEM_PRICE;

  return (
    <Box
      sx={{
        height: "100vh",
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
        <GemInfo gemId={+gemId} />
        {gem.level < maxLevel && (
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
              disabled={disableUpgradeGem}
              fullWidth
              onClick={handleUpgradeLevel}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  textTransform: "uppercase",

                  color: disableUpgradeGem ? colors.secondaryTextColor : "#000",
                }}
              >
                {`Upgrade to ${gem.level + 1}`}
              </Typography>
            </MainButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
