import { Box } from "@mui/material";
import { IGem } from "../../../core/types";
import { calculateSlotPositions } from "../constants";
import { gemKits } from "../../../core/constants";
import { colors } from "../../../core/theme/colors";
import { CustomTooltip } from "../../../components/ui/CustomTooltip";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import AddIcon from "@mui/icons-material/Add";

export const GemSlots = ({
  sockets,
  gemIds,
  gems,
  handleRemoveGem,
  handleOpenGemsPopup,
}: {
  sockets: number;
  gemIds: number[];
  gems: IGem[];
  handleRemoveGem: (gemId: number, slotIndex: number) => void;
  handleOpenGemsPopup: (slotIndex: number) => void;
}) => {
  return (
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
        const isSlotActive = index < sockets; // Проверяем, активен ли слот
        const gemId = gemIds[index]; // Получаем ID гема для слота
        const gem = gemId ? gems.find((g) => g.id === gemId) : null; // Получаем объект гема, если он существует
        const gemKit = gem?.kitId
          ? gemKits.find((kit) => kit.id === gem.kitId)
          : null;
        const allGemsFromKitInserted = gemKit
          ? gemKit.gemIds.every((kitGemId) => gemIds.includes(kitGemId))
          : false;

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
                    ? `1px solid ${
                        allGemsFromKitInserted ? colors.blue : "gray"
                      }` // Граница съёмного гема
                    : `1px dashed ${
                        allGemsFromKitInserted ? colors.blue : "gray"
                      }` // Граница несъёмного гема
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
                  : "not-allowed",
            }}
          >
            {isSlotActive ? (
              gem ? (
                <CustomTooltip
                  gemId={gem.id}
                  gemIds={gemIds}
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
  );
};
