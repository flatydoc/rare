import { Box, Typography } from "@mui/material";
import { centerContentStyles } from "../../../core/theme/common.style";
import { ICardPrototype } from "../../../core/types";
import { getRarityColor } from "../../../core/utils/getRarityColor";
import { Ambient } from "../../../components/ui/Ambient";
import pattern from "../../../assets/pattern.png";
import { rarityByTier } from "../../../core/utils/rarityByTier";
import { darkenColor } from "../../../core/utils/darkenColor";
import { colors } from "../../../core/theme/colors";
import { elementEmojis } from "../../SingleCardPage/constants";

export const CaseCardsList = ({
  caseCards,
}: {
  caseCards: ICardPrototype[];
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Сontent
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          width: "100%",
          mt: 3,
        }}
      >
        {caseCards.length > 0 ? (
          caseCards.map((card) => (
            <Box
              key={card.id}
              sx={{
                ...centerContentStyles,
                overflow: "hidden",
                flexDirection: "column",
                width: "100%",
                maxWidth: "240px",
                borderRadius: "20px",
                position: "relative",
                padding: "10px",
                aspectRatio: "1 / 1.4",
                boxShadow: `0 1px 2px 0 inset ${getRarityColor(card.rarity)}`,
                backgroundSize: "cover",
                backgroundColor: "rgb(25,25,25)",
                backgroundPosition: "center, top",
                backgroundRepeat: "no-repeat, repeat",
                backgroundImage: `
                  url(${pattern}),
                  linear-gradient(to top, rgb(5, 5, 5) 20%, rgb(25, 25, 25) 100%)
                `,
              }}
            >
              <Ambient rarity={card.rarity}>
                <img
                  src={card.img}
                  style={{
                    position: "absolute",
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Ambient>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  zIndex: "1",
                  width: "48px",
                  height: "48px",
                  transform: "scale(0.5)",
                  textShadow: `
                  -1px -1px 0 black,
                  1px -1px 0 black,
                  -1px 1px 0 black,
                  1px 1px 0 black
                `,
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
              {card.element !== "simple" && (
                <Typography
                  sx={{
                    position: "absolute",
                    top: "32px",
                    right: "8px",
                    fontSize: "14px",
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
                  {elementEmojis[card.element]}
                </Typography>
              )}
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  textShadow: `
                  -1px -1px 0 black,
                  1px -1px 0 black,
                  -1px 1px 0 black,
                  1px 1px 0 black
                `,
                }}
              >
                {card.name}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
            Карточки не найдены
          </Typography>
        )}
      </Box>
    </Box>
  );
};
