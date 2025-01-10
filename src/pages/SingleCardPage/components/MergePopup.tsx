import { Box, Typography } from "@mui/material";
import { CardsList } from "../../CardsPage/components/CardsList";
import { MainButton } from "../../../components/MainButton";
import { colors } from "../../../core/theme/colors";
import { ICard } from "../../../core/types";

export const MergePopup = ({
  handleMerge,
  selectedCardIdForMerge,
  handleSelectCard,
  cardId,
  cards,
}: {
  cardId: number;
  cards: ICard[];
  selectedCardIdForMerge: number | null;
  handleMerge: (cardId: number, selectedCardIdForMerge: number) => void;
  handleSelectCard: (id: number) => void;
}) => {
  return (
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
          selectedCardId={selectedCardIdForMerge}
          event={handleSelectCard}
          cards={cards}
        />
      </Box>

      <MainButton
        disabled={!selectedCardIdForMerge}
        fullWidth
        onClick={() =>
          selectedCardIdForMerge && handleMerge(cardId, selectedCardIdForMerge)
        }
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            color: selectedCardIdForMerge ? "#000" : colors.secondaryTextColor,
          }}
        >
          {selectedCardIdForMerge ? "MERGE" : "SELECT CARD"}
        </Typography>
      </MainButton>
    </Box>
  );
};
