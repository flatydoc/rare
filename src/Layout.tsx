import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { Navigation } from "./components/Navigation/Navigation";
import { useCardStore } from "./core/store/useCardStore";
import zombie from "./assets/zombie_level_1.png";

export const Layout = () => {
  const setCards = useCardStore((state) => state.setCards);

  setCards([
    {
      id: 101,
      number: 1,
      rarity: "common",
      price: 100,
      power: 16,
      powerCoef: 1.2,
      health: 48,
      healthCoef: 1.3,
      armor: 12,
      armorCoef: 1.5,
      exp: 150,
      level: 2,
      stars: 0,
      fraction: "undead",
      priceCurrency: "inGame",
      name: "Default Zombie",
      description: "A basic tueben'",
      img: zombie,
      gemIds: [],
      sockets: 0,
      element: "poison",
      class: "defender",
    },
    {
      id: 102,
      number: 1,
      rarity: "common",
      price: 100,
      power: 16,
      powerCoef: 1.2,
      health: 48,
      healthCoef: 1.3,
      armor: 12,
      armorCoef: 1.5,
      exp: 150,
      level: 1,
      stars: 0,
      fraction: "undead",
      priceCurrency: "inGame",
      name: "Default Zombie",
      description: "A basic tueben'",
      img: zombie,
      gemIds: [],
      sockets: 0,
      element: "poison",
      class: "defender",
    },
  ]);

  return (
    <>
      <Box
        component={"main"}
        sx={{
          position: "relative",
          height: `100vh`,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
      <Navigation />
    </>
  );
};
