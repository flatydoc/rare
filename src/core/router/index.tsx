import { createBrowserRouter } from "react-router-dom";
import { RouteList } from "./routes";

import { Layout } from "../../Layout";
import { Root } from "../../Root";
import { HomePage } from "../../pages/HomePage/HomePage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { ShopPage } from "../../pages/ShopPage/ShopPage";
import { TasksPage } from "../../pages/TasksPage/TasksPage";
import { FriendsPage } from "../../pages/FriendsPage/FriendsPage";
import { LeadersPage } from "../../pages/LeadersPage/LeadersPage";
import { CasePage } from "../../pages/CasePage/CasePage";
import { CardsPage } from "../../pages/CardsPage/CardsPage";
import { SingleCardPage } from "../../pages/SingleCardPage/SingleCardPage";

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
            path: RouteList.Profile,
            element: <ProfilePage />,
          },
          {
            path: RouteList.Shop,
            element: <ShopPage />,
          },
          {
            path: `${RouteList.Shop}/:caseId`,
            element: <CasePage />,
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
