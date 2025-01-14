import { createBrowserRouter } from "react-router-dom";

import { Layout } from "../../Layout";
import { Root } from "../../Root";
import { HomePage } from "../../pages/HomePage/HomePage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { ShopPage } from "../../pages/ShopPage/ShopPage";
import { TasksPage } from "../../pages/TasksPage/TasksPage";
import { FriendsPage } from "../../pages/FriendsPage/FriendsPage";
import { LeadersPage } from "../../pages/LeadersPage/LeadersPage";
import { CardsPage } from "../../pages/CardsPage/CardsPage";
import { RouteList } from "../enums";
import { SingleGemPage } from "../../pages/SingleGemPage/SingleGemPage";
import { SingleCardPage } from "../../pages/SingleCardPage/SingleCardPage";
import { SingleCasePage } from "../../pages/SingleCasePage/SingleCasePage";
import { FightPage } from "../../pages/FightPage/FightPage";
import { InventoryPage } from "../../pages/InventoryPage/InventoryPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: RouteList.Root,
            element: <HomePage />,
          },
          {
            path: `${RouteList.PVE}/:fightId`,
            element: <FightPage />,
          },
          {
            path: RouteList.Profile,
            element: <ProfilePage />,
          },
          {
            path: RouteList.Shop,
            element: <ShopPage />,
          },
          {
            path: `${RouteList.Shop}/:caseId`,
            element: <SingleCasePage />,
          },
          {
            path: RouteList.Cards,
            element: <CardsPage />,
          },
          {
            path: `${RouteList.Cards}/:cardId`,
            element: <SingleCardPage />,
          },
          {
            path: RouteList.Inventory,
            element: <InventoryPage />,
          },
          {
            path: `${RouteList.Gems}/:gemId`,
            element: <SingleGemPage />,
          },
          {
            path: RouteList.Tasks,
            element: <TasksPage />,
          },
          {
            path: RouteList.Friends,
            element: <FriendsPage />,
          },
          {
            path: RouteList.Leaders,
            element: <LeadersPage />,
          },
        ],
      },
    ],
  },
]);
