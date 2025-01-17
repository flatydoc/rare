import { Outlet, useLocation } from "react-router";
import { Box } from "@mui/material";
import { Navigation } from "./components/Navigation/Navigation";
import { useCardStore } from "./core/store/useCardStore";
import zombie from "./assets/zombie_level_1.png";
import { useGemStore } from "./core/store/useGemStore";
import gem1 from "./assets/gem1.png";
import gem2 from "./assets/gem2.png";
import gem3 from "./assets/gem3.png";
import gem4 from "./assets/gem4.png";
import gem5 from "./assets/gem5.png";
import gem6 from "./assets/gem6.png";
import { useAllCardsStore } from "./core/store/useAllCardsStore";
import { useCaseStore } from "./core/store/useCaseStore";
import gold from "./assets/gold.webp";
import silver from "./assets/silver.webp";
import { RouteList } from "./core/enums";
import { useEffect } from "react";

export const Layout = () => {
  const setCards = useCardStore((state) => state.setCards);
  const setAllCards = useAllCardsStore((state) => state.setCards);
  const setCases = useCaseStore((state) => state.setCases);
  const setGems = useGemStore((state) => state.setGems);
  const location = useLocation();

  const isHideNavigation = location.pathname.startsWith(`/${RouteList.Fight}/`);

  useEffect(() => {
    setCards([
      {
        id: 101,
        number: 1,
        rarity: "common",
        tier: "SS",
        price: 100,
        damage: 10,
        bonusDamage: 0,
        damageCoef: 1.2,
        health: 100,
        bonusHealth: 0,
        healthCoef: 1.2,
        armor: 5,
        bonusArmor: 0,
        armorCoef: 1.6,
        exp: 150,
        level: 1,
        stars: 0,
        fraction: "orcs",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        gemIds: [],
        sockets: 0,
        element: "simple",
        class: "fighter",
      },
      {
        id: 102,
        number: 1,
        rarity: "common",
        tier: "A+",
        price: 100,
        damage: 10,
        bonusDamage: 0,
        damageCoef: 1.2,
        health: 100,
        bonusHealth: 0,
        healthCoef: 1.3,
        armor: 5,
        bonusArmor: 0,
        armorCoef: 1.5,
        exp: 150,
        level: 1,
        stars: 0,
        fraction: "orcs",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        gemIds: [],
        sockets: 0,
        element: "flame",
        class: "defender",
      },
      {
        id: 103,
        number: 1,
        rarity: "common",
        tier: "S+",
        price: 100,
        damage: 10,
        bonusDamage: 0,
        damageCoef: 1.2,
        health: 100,
        bonusHealth: 0,
        healthCoef: 1.2,
        armor: 5,
        bonusArmor: 0,
        armorCoef: 1.6,
        exp: 150,
        level: 1,
        stars: 0,
        fraction: "orcs",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        gemIds: [],
        sockets: 0,
        element: "poison",
        class: "support",
      },
    ]);
  }, []);
  useEffect(() => {
    setAllCards([
      {
        id: 1,
        rarity: "common",
        tier: "B",
        price: 100,
        damage: 16,
        damageCoef: 1.2,
        health: 48,
        healthCoef: 1.2,
        armor: 2,
        armorCoef: 1.6,
        fraction: "demons",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        sockets: 0,
        element: "simple",
        class: "fighter",
      },
      {
        id: 2,
        rarity: "common",
        tier: "B",
        price: 100,
        damage: 16,
        damageCoef: 1.2,
        health: 48,
        healthCoef: 1.3,
        armor: 12,
        armorCoef: 1.5,
        fraction: "undead",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        sockets: 0,
        element: "poison",
        class: "defender",
      },
      {
        id: 3,
        rarity: "common",
        tier: "B",
        price: 100,
        damage: 16,
        damageCoef: 1.2,
        health: 48,
        healthCoef: 1.3,
        armor: 12,
        armorCoef: 1.5,
        fraction: "orcs",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        sockets: 0,
        element: "poison",
        class: "fighter",
      },
      {
        id: 4,
        rarity: "common",
        tier: "B",
        price: 100,
        damage: 16,
        damageCoef: 1.2,
        health: 48,
        healthCoef: 1.3,
        armor: 12,
        armorCoef: 1.5,
        fraction: "elves",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        sockets: 0,
        element: "poison",
        class: "defender",
      },
      {
        id: 5,
        rarity: "common",
        tier: "B",
        price: 100,
        damage: 16,
        damageCoef: 1.2,
        health: 48,
        healthCoef: 1.3,
        armor: 12,
        armorCoef: 1.5,
        fraction: "alliance",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        sockets: 0,
        element: "poison",
        class: "support",
      },
      {
        id: 6,
        rarity: "common",
        tier: "B",
        price: 100,
        damage: 16,
        damageCoef: 1.2,
        health: 48,
        healthCoef: 1.3,
        armor: 12,
        armorCoef: 1.5,
        fraction: "undead",
        priceCurrency: "inGame",
        name: "Default Zombie",
        description: "A basic tueben'",
        img: zombie,
        sockets: 0,
        element: "poison",
        class: "support",
      },
    ]);
  }, []);
  useEffect(() => {
    setGems([
      {
        id: 120,
        number: 1,
        level: 1,
        inserted: false,
        rarity: "immortal",
        price: 300,
        priceCurrency: "inGame",
        name: "Ruby of Flame Power",
        description: "Ruby increases strength and changes damage type to flame",
        tooltipTitle: "• #+15# attack \n• Changes damage type to flame",
        damageModifier: 15,
        armorModifier: 0,
        healthModifier: 0,
        gradeModifier: 1,
        element: "flame",
        removable: false,
        img: gem6,
      },
      {
        id: 121,
        number: 1,
        level: 1,
        inserted: false,
        rarity: "common",
        price: 100,
        priceCurrency: "inGame",
        name: "Sapphire of Health",
        description: "A sapphire that boosts health.",
        tooltipTitle: "• #+10# health \n• #-20# armor",
        damageModifier: 15,
        armorModifier: -20,
        healthModifier: 10,
        gradeModifier: 0,
        removable: true,
        img: gem2,
        kitId: 1,
      },
      {
        id: 122,
        number: 2,
        level: 1,
        inserted: false,
        rarity: "epic",
        price: 700,
        priceCurrency: "ton",
        name: "Emerald of Fortitude",
        description: "An emerald that greatly enhances both power and health.",
        tooltipTitle: "• #+10# power \n• #+20# health",
        damageModifier: 15,
        armorModifier: 0,
        healthModifier: 20,
        gradeModifier: 2,
        removable: true,
        img: gem3,
        kitId: 1,
      },
      {
        id: 123,
        number: 3,
        level: 1,
        inserted: false,
        rarity: "legendary",
        price: 1500,
        priceCurrency: "ton",
        name: "Diamond of Perfection",
        description: "A diamond that significantly boosts all attributes.",
        tooltipTitle: "• #+20# armor \n• #+20# health",
        damageModifier: 15,
        armorModifier: 20,
        healthModifier: 20,
        gradeModifier: 3,
        removable: true,
        img: gem4,
        kitId: 1,
      },
      {
        id: 124,
        number: 4,
        level: 1,
        inserted: false,
        rarity: "common",
        price: 50,
        priceCurrency: "inGame",
        name: "Amber of Speed",
        description: "An amber that slightly increases power.",
        tooltipTitle: "• #+5# power \n• #+5# armor \n• #+5# health",
        damageModifier: 15,
        armorModifier: 5,
        healthModifier: 5,
        gradeModifier: 0,
        removable: true,
        img: gem5,
      },
      {
        id: 125,
        number: 4,
        level: 1,
        inserted: false,
        rarity: "common",
        price: 50,
        priceCurrency: "inGame",
        name: "Amber of Speed",
        description: "An amber that slightly increases power.",
        tooltipTitle: "• #+5# armor",
        damageModifier: 15,
        armorModifier: 5,
        healthModifier: 0,
        gradeModifier: 0,
        removable: true,
        img: gem1,
      },
    ]);
  }, []);
  useEffect(() => {
    setCases([
      {
        id: 21,
        category: "exclusive",
        rarity: "rare",
        price: 150,
        priceCurrency: "ton",
        name: "Elite Case",
        description: "Only available for premium members.",
        cardIds: [1, 2, 3, 4],
        img: silver,
      },
      {
        id: 22,
        category: "exclusive",
        rarity: "legendary",
        price: 300,
        priceCurrency: "ton",
        name: "Mystic Vault",
        description: "Contains rare and mystical treasures.",
        cardIds: [5, 6],
        img: gold,
      },
    ]);
  }, []);

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
      <Navigation isHide={isHideNavigation} />
    </>
  );
};
