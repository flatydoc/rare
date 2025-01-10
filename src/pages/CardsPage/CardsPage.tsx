import { Box, IconButton, Typography } from "@mui/material";
import { useCardStore } from "../../core/store/useCardStore";
import { CardsList } from "./components/CardsList";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../../core/enums";
import { useState } from "react";
import { ICard } from "../../core/types";
import { sortOrders } from "./constants";
import { calculateTotalPower } from "../../core/utils/calculateTotalPower";
import { Popup } from "../../components/Popup";
import { SortPopup } from "./components/SortPopup";
import { CustomTooltip } from "../../components/ui/CustomTooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import { colors } from "../../core/theme/colors";

export const CardsPage = () => {
  const cards = useCardStore((state) => state.cards);
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<string>("totalPower");
  const [filters, setFilters] = useState({
    class: "",
    fraction: "",
    element: "",
  });
  const [isOpenSortPopup, setIsOpenSortPopup] = useState(false);

  const handleOpenSortPopup = () => {
    setIsOpenSortPopup(!isOpenSortPopup);
  };

  const applyFilters = (cards: ICard[]) => {
    return cards.filter((card) => {
      const { class: cardClass, fraction, element } = filters;
      return (
        (!cardClass || card.class === cardClass) &&
        (!fraction || card.fraction === fraction) &&
        (!element || card.element === element)
      );
    });
  };

  const getSortedCards = () => {
    const filteredCards = applyFilters(cards);

    return [...filteredCards].sort((a, b) => {
      if (sortKey in sortOrders) {
        const order = sortOrders[sortKey as keyof typeof sortOrders]!;
        return (
          order.indexOf(a[sortKey as keyof ICard] as string) -
          order.indexOf(b[sortKey as keyof ICard] as string)
        );
      }

      if (sortKey === "level" || sortKey === "stars") {
        return (
          (b[sortKey as keyof ICard] as number) -
          (a[sortKey as keyof ICard] as number)
        );
      }

      if (sortKey === "totalPower") {
        return calculateTotalPower(b) - calculateTotalPower(a);
      }

      return 0;
    });
  };

  const handleNav = (id: number) => {
    navigate(`/${RouteList.Cards}/${id}`);
  };

  return (
    <Box
      sx={{
        height: "100%",
        p: "24px 16px 104px 16px",
        overflowY: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
      }}
    >
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
          {`Heroes:`}
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
          {cards.length}
        </Typography>
        <IconButton
          onClick={handleOpenSortPopup}
          sx={{
            color: colors.secondaryTextColor,
            zIndex: 1,
            transform: "translateY(-50%)",
            position: "absolute",
            right: "-36px",
            padding: "4px",
            top: "50%",
          }}
        >
          <SwapVertIcon
            sx={{
              width: "24px",
              height: "24px",
            }}
          />
        </IconButton>
      </Box>
      <CardsList event={handleNav} cards={getSortedCards()} />
      <Popup isShow={isOpenSortPopup} setIsShow={setIsOpenSortPopup}>
        <SortPopup
          sortKey={sortKey}
          setSortKey={setSortKey}
          filters={filters}
          setFilters={setFilters}
        />
      </Popup>
    </Box>
  );
};
