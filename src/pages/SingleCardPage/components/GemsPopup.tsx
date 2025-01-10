import { Box, Typography } from "@mui/material";
import { colors } from "../../../core/theme/colors";
import { GemInfo } from "../../SingleGemPage/components/GemInfo";
import { GemsList } from "../../InventoryPage/components/GemsList";
import { MainButton } from "../../../components/MainButton";
import { INSERT_GEM_PRICE } from "../../../core/constants";
import { IGem } from "../../../core/types";

export const GemsPopup = ({
  selectedGem,
  userBalance,
  gems,
  gemIds,
  handleInsertGem,
  handleSelectGem,
}: {
  selectedGem: number | null;
  userBalance?: number;
  gems: IGem[];
  gemIds: number[];
  handleInsertGem: (gemId: number) => void;
  handleSelectGem: (id: number) => void;
}) => {
  const disableInsertGem =
    !selectedGem || userBalance === undefined || userBalance < INSERT_GEM_PRICE;

  return (
    <Box>
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
            <GemInfo gemId={selectedGem} gemIds={gemIds} />
          ) : (
            <GemsList event={handleSelectGem} gems={gems} />
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
                {userBalance}
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
                  color: disableInsertGem ? colors.secondaryTextColor : "#000",
                }}
              >
                {`INSERT GEM FOR ${INSERT_GEM_PRICE}`}
              </Typography>
            </MainButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
