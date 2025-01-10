import { Box, Typography } from "@mui/material";
import { CardsList } from "../../CardsPage/components/CardsList";
import { MainButton } from "../../../components/MainButton";
import { colors } from "../../../core/theme/colors";
import { ICard } from "../../../core/types";

export const SelectCardPopup = ({
  handleSelectCardForInsert,
  selectedCardIdForInsert,
  cards,
  handleInsertCard,
}: {
  cards: ICard[];
  selectedCardIdForInsert: number | null;
  handleInsertCard: (selectedCardIdForInser: number) => void;
  handleSelectCardForInsert: (selectedCardIdForInser: number) => void;
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
          selectedCardId={selectedCardIdForInsert}
          event={handleSelectCardForInsert}
          cards={cards}
        />
      </Box>

      <MainButton
        disabled={!selectedCardIdForInsert}
        fullWidth
        onClick={() =>
          selectedCardIdForInsert && handleInsertCard(selectedCardIdForInsert)
        }
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            color: selectedCardIdForInsert ? "#000" : colors.secondaryTextColor,
          }}
        >
          {selectedCardIdForInsert ? "INSERT" : "SELECT CARD"}
        </Typography>
      </MainButton>
    </Box>
  );
};
